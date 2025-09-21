const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

const app = require('../../../app');

describe('Testes de Reservas', () => {
    let token;

    before(async () => {
        // Criar um hóspede para usar nos testes de reserva
        const criarHospede = require('../fixture/hospedes/criarHospede.json');
        await request(app)
            .post('/hospedes')
            .send(criarHospede);
            
        // Fazer login para obter o token
        const loginResponse = await request(app)
            .post('/hospedes/login')
            .send({
                email: criarHospede.email,
                senha: criarHospede.senha
            });
        
        token = loginResponse.body.data.token;
            
        // Criar segundo hóspede para testes de conflito
        const criarSegundoHospede = require('../fixture/hospedes/criarSegundoHospede.json');
        await request(app)
            .post('/hospedes')
            .send(criarSegundoHospede);
    });

    it('Validar que é possível criar uma reserva', async () => {
        const respostaEsperada = require('../fixture/respostas/reservas/criarReservaResposta.json');
        const criarReserva = require('../fixture/reservas/criarReserva.json');
        
        const resposta = await request(app)
            .post('/reservas')
            .set('Authorization', `Bearer ${token}`)
            .send(criarReserva);

        expect(resposta.status).to.equal(201);
        expect(resposta.body.success).to.equal(respostaEsperada.success);
        expect(resposta.body.message).to.equal(respostaEsperada.message);
        expect(resposta.body.data.idReserva).to.equal(respostaEsperada.data.idReserva);
        expect(resposta.body.data.idHospede).to.equal(respostaEsperada.data.idHospede);
        expect(resposta.body.data.idQuarto).to.equal(respostaEsperada.data.idQuarto);
    });

    it('Validar que é possível listar todas as reservas', async () => {
        const resposta = await request(app)
            .get('/reservas')
            .set('Authorization', `Bearer ${token}`);

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.an('array');
        expect(resposta.body.data.length).to.be.greaterThan(0);
    });

    it('Validar que é possível consultar reserva por ID', async () => {
        const resposta = await request(app)
            .get('/reservas/1')
            .set('Authorization', `Bearer ${token}`);

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data.idReserva).to.equal(1);
        expect(resposta.body.data.status).to.equal('ativa');
    });

    it('Validar que é possível cancelar uma reserva', async () => {
        // Primeiro criar uma nova reserva para cancelar
        const novaReserva = {
            "idHospede": 2,
            "idQuarto": 2,
            "dataCheckin": "2023-12-10",
            "dataCheckout": "2023-12-15"
        };
        
        const respostaCriar = await request(app)
            .post('/reservas')
            .set('Authorization', `Bearer ${token}`)
            .send(novaReserva);
            
        const idReserva = respostaCriar.body.data.idReserva;

        // Agora cancelar a reserva
        const resposta = await request(app)
            .delete(`/reservas/${idReserva}/cancelar`)
            .set('Authorization', `Bearer ${token}`);

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data.status).to.equal('cancelada');
    });

    it('Validar que é possível listar reservas por hóspede', async () => {
        const resposta = await request(app)
            .get('/hospedes/1/reservas')
            .set('Authorization', `Bearer ${token}`);

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.an('array');
        expect(resposta.body.data.every(reserva => reserva.idHospede === 1)).to.be.true;
    });

    const testesRegraNegocio = require('../fixture/reservas/criarReservaComErro.json');
    testesRegraNegocio.forEach(teste => {
        it(`Testando a regra relacionada a ${teste.nomeDoTeste}`, async () => {
            const resposta = await request(app)
                .post('/reservas')
                .set('Authorization', `Bearer ${token}`)
                .send(teste.reserva);

            expect(resposta.status).to.equal(400);
            expect(resposta.body.success).to.equal(false);
            expect(resposta.body.message).to.equal(teste.mensagemEsperada);
        });
    });
});
