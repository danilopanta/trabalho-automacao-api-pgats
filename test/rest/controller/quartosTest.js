const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

const app = require('../../../app');

describe('Testes de Quartos', () => {
    
    it('Validar que é possível listar todos os quartos', async () => {
        const resposta = await request(app)
            .get('/quartos');

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.an('array');
        expect(resposta.body.data.length).to.equal(6); // 6 quartos pré-cadastrados
    });

    it('Validar que é possível consultar quartos por tipo', async () => {
        const resposta = await request(app)
            .get('/quartos/tipo/solteiro');

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.an('array');
        expect(resposta.body.data.every(quarto => quarto.tipo === 'solteiro')).to.be.true;
    });

    it('Validar que é possível consultar quartos por status', async () => {
        const resposta = await request(app)
            .get('/quartos/status/disponível');

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data).to.be.an('array');
        expect(resposta.body.data.every(quarto => quarto.status === 'disponível')).to.be.true;
    });

    it('Validar que é possível consultar quarto por ID', async () => {
        const resposta = await request(app)
            .get('/quartos/1');

        expect(resposta.status).to.equal(200);
        expect(resposta.body.success).to.equal(true);
        expect(resposta.body.data.id).to.equal(1);
        expect(resposta.body.data.numero).to.equal(101);
    });

    it('Validar erro ao consultar tipo de quarto inválido', async () => {
        const resposta = await request(app)
            .get('/quartos/tipo/inexistente');

        expect(resposta.status).to.equal(400);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.message).to.include('Tipo de quarto inválido');
    });

    it('Validar erro ao consultar quarto inexistente', async () => {
        const resposta = await request(app)
            .get('/quartos/999');

        expect(resposta.status).to.equal(404);
        expect(resposta.body.success).to.equal(false);
        expect(resposta.body.message).to.equal('Quarto não encontrado');
    });
});
