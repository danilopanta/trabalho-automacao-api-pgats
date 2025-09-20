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
            "telefone": "(11) 77777-7777"
        };

        const respostaHospede = await request(app)
            .post('/hospedes')
            .send(novoHospede);

        expect(respostaHospede.status).to.equal(201);
        const idHospede = respostaHospede.body.data.id;

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
            .delete(`/reservas/${idReserva}/cancelar`);

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
            "telefone": "(11) 66666-6666"
        };

        const hospede2 = {
            "nome": "Lucia Santos",
            "email": "lucia@email.com",
            "telefone": "(11) 55555-5555"
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
            .send(reserva1);

        const respostaReserva2 = await request(app)
            .post('/reservas')
            .send(reserva2);

        expect(respostaReserva1.status).to.equal(201);
        expect(respostaReserva2.status).to.equal(201);

        // 3. Verificar que ambas as reservas foram criadas
        const respostaListaReservas = await request(app)
            .get('/reservas');

        const reservasAtivas = respostaListaReservas.body.data.filter(r => r.status === 'ativa');
        expect(reservasAtivas.length).to.be.greaterThanOrEqual(2);
    });

    it('Validar cenário de tentativa de reserva em período ocupado', async () => {
        // 1. Fazer primeira reserva
        const primeiraReserva = {
            "idHospede": 1,
            "idQuarto": 5,
            "dataCheckin": "2024-02-01",
            "dataCheckout": "2024-02-05"
        };

        const respostaPrimeira = await request(app)
            .post('/reservas')
            .send(primeiraReserva);

        expect(respostaPrimeira.status).to.equal(201);

        // 2. Tentar fazer segunda reserva no mesmo quarto com sobreposição de datas
        const segundaReserva = {
            "idHospede": 2,
            "idQuarto": 5,
            "dataCheckin": "2024-02-03",
            "dataCheckout": "2024-02-07"
        };

        const respostaSegunda = await request(app)
            .post('/reservas')
            .send(segundaReserva);

        expect(respostaSegunda.status).to.equal(400);
        expect(respostaSegunda.body.message).to.equal('Quarto não está disponível no período informado');
    });
});
