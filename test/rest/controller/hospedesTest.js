const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

const app = require('../../../app');

describe('Testes de Hóspedes', () => {
    
    it('Validar que é possível registrar um hóspede', async () => {
        const respostaEsperada = require('../fixture/respostas/hospedes/criarHospedeResposta.json');
        const criarHospede = require('../fixture/hospedes/criarHospede.json');
        
        const resposta = await request(app)
            .post('/hospedes')
            .send(criarHospede);

        expect(resposta.status).to.equal(201);
        expect(resposta.body)
            .to.deep.equal(respostaEsperada);
    });

    it('Validar que é possível listar todos os hóspedes', async () => {
        const resposta = await request(app)
            .get('/hospedes');

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.an('array');
        expect(resposta.body.data.length).to.be.greaterThan(0);
    });

    it('Validar que é possível consultar hóspede por ID', async () => {
        const resposta = await request(app)
            .get('/hospedes/1');

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data.id).to.equal(1);
        expect(resposta.body.data.nome).to.equal('Danilo Panta');
    });

    it('Validar erro ao consultar hóspede inexistente', async () => {
        const resposta = await request(app)
            .get('/hospedes/999');

        expect(resposta.status).to.equal(404);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.message).to.equal('Hóspede não encontrado');
    });

    const testesRegraNegocio = require('../fixture/hospedes/criarHospedeComErro.json');
    testesRegraNegocio.forEach(teste => {
        it(`Testando a regra relacionada a ${teste.nomeDoTeste}`, async () => {
            const resposta = await request(app)
                .post('/hospedes')
                .send(teste.hospede);

            expect(resposta.status).to.equal(400);
            expect(resposta.body.success).to.equal(false);
            expect(resposta.body.message).to.equal(teste.mensagemEsperada);
        });
    });
});
