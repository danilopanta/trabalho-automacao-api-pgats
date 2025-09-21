const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

const app = require('../../../app');

describe('Testes de Fluxo Completo (External)', () => {

    it('Validar fluxo completo: cadastrar hóspede, fazer reserva e cancelar', async () => {
        // 1. Cadastrar hóspede
        const novoHospede = {
            "nome": "Ana Costa",
            "email": "ana@email.com",
            "telefone": "(11) 77777-7777",
            "senha": "123456"
        };

        const respostaHospede = await request(app)
            .post('/hospedes')
            .send(novoHospede);

        expect(respostaHospede.status).to.equal(201);
        const idHospede = respostaHospede.body.data.id;

        // 1.1. Fazer login para obter token
        const respostaLogin = await request(app)
            .post('/hospedes/login')
            .send({
                email: novoHospede.email,
                senha: novoHospede.senha
            });

        expect(respostaLogin.status).to.equal(200);
        const token = respostaLogin.body.data.token;

        // 2. Verificar quartos disponíveis
        const respostaQuartos = await request(app)
            .get('/quartos/status/disponível');

        expect(respostaQuartos.status).to.equal(200);
        expect(respostaQuartos.body.data.length).to.be.greaterThan(0);
        const quartoDisponivel = respostaQuartos.body.data[0];

        // 3. Criar reserva
        const novaReserva = {
            "idHospede": idHospede,
            "idQuarto": quartoDisponivel.id,
            "dataCheckin": "2023-12-20",
            "dataCheckout": "2023-12-25"
        };

        const respostaReserva = await request(app)
            .post('/reservas')
            .set('Authorization', `Bearer ${token}`)
            .send(novaReserva);

        expect(respostaReserva.status).to.equal(201);
        expect(respostaReserva.body.data.status).to.equal('ativa');
        const idReserva = respostaReserva.body.data.idReserva;

        // 4. Verificar que o quarto ficou ocupado
        const respostaQuartoOcupado = await request(app)
            .get(`/quartos/${quartoDisponivel.id}`);

        expect(respostaQuartoOcupado.status).to.equal(200);
        expect(respostaQuartoOcupado.body.data.status).to.equal('ocupado');

        // 5. Cancelar reserva
        const respostaCancelamento = await request(app)
            .delete(`/reservas/${idReserva}/cancelar`)
            .set('Authorization', `Bearer ${token}`);

        expect(respostaCancelamento.status).to.equal(200);
        expect(respostaCancelamento.body.data.status).to.equal('cancelada');

        // 6. Verificar que o quarto voltou a ficar disponível
        const respostaQuartoDisponivel = await request(app)
            .get(`/quartos/${quartoDisponivel.id}`);

        expect(respostaQuartoDisponivel.status).to.equal(200);
        expect(respostaQuartoDisponivel.body.data.status).to.equal('disponível');
    });

    it('Validar fluxo de múltiplas reservas sem conflito', async () => {
        // 1. Cadastrar dois hóspedes
        const hospede1 = {
            "nome": "Carlos Silva",
            "email": "carlos@email.com",
            "telefone": "(11) 66666-6666",
            "senha": "123456"
        };

        const hospede2 = {
            "nome": "Lucia Santos",
            "email": "lucia@email.com",
            "telefone": "(11) 55555-5555",
            "senha": "654321"
        };

        const respostaHospede1 = await request(app)
            .post('/hospedes')
            .send(hospede1);

        const respostaHospede2 = await request(app)
            .post('/hospedes')
            .send(hospede2);

        expect(respostaHospede1.status).to.equal(201);
        expect(respostaHospede2.status).to.equal(201);

        const idHospede1 = respostaHospede1.body.data.id;
        const idHospede2 = respostaHospede2.body.data.id;

        // 1.1. Fazer login para obter tokens
        const respostaLogin1 = await request(app)
            .post('/hospedes/login')
            .send({
                email: hospede1.email,
                senha: hospede1.senha
            });

        const respostaLogin2 = await request(app)
            .post('/hospedes/login')
            .send({
                email: hospede2.email,
                senha: hospede2.senha
            });

        const token1 = respostaLogin1.body.data.token;
        const token2 = respostaLogin2.body.data.token;

        // 2. Fazer reservas em quartos diferentes
        const reserva1 = {
            "idHospede": idHospede1,
            "idQuarto": 3,
            "dataCheckin": "2024-01-01",
            "dataCheckout": "2024-01-05"
        };

        const reserva2 = {
            "idHospede": idHospede2,
            "idQuarto": 4,
            "dataCheckin": "2024-01-01",
            "dataCheckout": "2024-01-05"
        };

        const respostaReserva1 = await request(app)
            .post('/reservas')
            .set('Authorization', `Bearer ${token1}`)
            .send(reserva1);

        const respostaReserva2 = await request(app)
            .post('/reservas')
            .set('Authorization', `Bearer ${token2}`)
            .send(reserva2);

        expect(respostaReserva1.status).to.equal(201);
        expect(respostaReserva2.status).to.equal(201);

        // 3. Verificar que ambas as reservas foram criadas
        const respostaListaReservas = await request(app)
            .get('/reservas')
            .set('Authorization', `Bearer ${token1}`);

        const reservasAtivas = respostaListaReservas.body.data.filter(r => r.status === 'ativa');
        expect(reservasAtivas.length).to.be.greaterThanOrEqual(2);
    });

    it('Validar cenário de tentativa de reserva em período ocupado', async () => {
        // 0. Garantir que existe um hóspede e fazer login
        const hospede = {
            "nome": "João Teste",
            "email": "joao.teste@email.com",
            "telefone": "(11) 99999-9999",
            "senha": "123456"
        };

        const respostaCriarHospede = await request(app)
            .post('/hospedes')
            .send(hospede);

        expect(respostaCriarHospede.status).to.equal(201);
        const idHospede = respostaCriarHospede.body.data.id;

        const respostaLogin = await request(app)
            .post('/hospedes/login')
            .send({
                email: hospede.email,
                senha: hospede.senha
            });

        expect(respostaLogin.status).to.equal(200);
        const token = respostaLogin.body.data.token;

        // 1. Fazer primeira reserva
        const primeiraReserva = {
            "idHospede": idHospede,
            "idQuarto": 5,
            "dataCheckin": "2024-02-01",
            "dataCheckout": "2024-02-05"
        };

        const respostaPrimeira = await request(app)
            .post('/reservas')
            .set('Authorization', `Bearer ${token}`)
            .send(primeiraReserva);

        expect(respostaPrimeira.status).to.equal(201);

        // 2. Criar segundo hóspede para tentar fazer reserva conflitante
        const hospede2 = {
            "nome": "Maria Teste",
            "email": "maria.teste@email.com",
            "telefone": "(11) 88888-8888",
            "senha": "654321"
        };

        const respostaCriarHospede2 = await request(app)
            .post('/hospedes')
            .send(hospede2);

        const idHospede2 = respostaCriarHospede2.body.data.id;

        const respostaLogin2 = await request(app)
            .post('/hospedes/login')
            .send({
                email: hospede2.email,
                senha: hospede2.senha
            });

        const token2 = respostaLogin2.body.data.token;

        // 3. Tentar fazer segunda reserva no mesmo quarto com sobreposição de datas
        const segundaReserva = {
            "idHospede": idHospede2,
            "idQuarto": 5,
            "dataCheckin": "2024-02-03",
            "dataCheckout": "2024-02-07"
        };

        const respostaSegunda = await request(app)
            .post('/reservas')
            .set('Authorization', `Bearer ${token2}`)
            .send(segundaReserva);

        expect(respostaSegunda.status).to.equal(400);
        expect(respostaSegunda.body.message).to.equal('Quarto não está disponível no período informado');
    });
});
