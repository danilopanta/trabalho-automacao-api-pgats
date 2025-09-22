const { expect } = require('chai');
const server = require('../testServer');

describe('Testes GraphQL - Hóspedes', () => {

    it('Validar que é possível registrar um hóspede via GraphQL', async () => {
        const mutation = {
            query: `mutation {
                registrarHospede(nome: "João Silva", email: "joao@email.com", telefone: "11999999999", senha: "123456") {
                    ... on SuccessResponse {
                        success
                        message
                        data
                    }
                    ... on ErrorResponse {
                        success
                        message
                    }
                }
            }`
        };

        const response = await server.executeOperation(mutation);

        expect(response.body.kind).to.equal('single');
        expect(response.body.singleResult.data.registrarHospede.success).to.equal(true);
        expect(response.body.singleResult.data.registrarHospede.message).to.equal('Hóspede registrado com sucesso');
        
        const hospede = JSON.parse(response.body.singleResult.data.registrarHospede.data);
        expect(hospede.nome).to.equal('João Silva');
        expect(hospede.email).to.equal('joao@email.com');
    });

    it('Validar que é possível fazer login de hóspede via GraphQL', async () => {
        const mutation = {
            query: `mutation {
                loginHospede(email: "joao@email.com", senha: "123456") {
                    ... on SuccessResponse {
                        success
                        message
                        data
                    }
                    ... on ErrorResponse {
                        success
                        message
                    }
                }
            }`
        };

        const response = await server.executeOperation(mutation);

        expect(response.body.kind).to.equal('single');
        expect(response.body.singleResult.data.loginHospede.success).to.equal(true);
        expect(response.body.singleResult.data.loginHospede.message).to.equal('Login realizado com sucesso');
        
        const loginData = JSON.parse(response.body.singleResult.data.loginHospede.data);
        expect(loginData.token).to.be.a('string');
        expect(loginData.hospede.email).to.equal('joao@email.com');
    });

});
