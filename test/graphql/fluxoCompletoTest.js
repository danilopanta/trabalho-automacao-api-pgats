const { expect } = require('chai');
const server = require('./testServer');

describe('Testes de Fluxo Completo', () => {

    it('Validar fluxo completo GraphQL: registrar, login e criar reserva', async () => {
        // 1. Registrar hóspede
        const registerMutation = {
            query: `mutation {
                registrarHospede(nome: "Ana Costa", email: "ana@email.com", telefone: "11777777777", senha: "123456") {
                    ... on SuccessResponse {
                        success
                        message
                        data
                    }
                }
            }`
        };
        
        const registerResponse = await server.executeOperation(registerMutation);
        expect(registerResponse.body.singleResult.data.registrarHospede.success).to.equal(true);

        // 2. Fazer login
        const loginMutation = {
            query: `mutation {
                loginHospede(email: "ana@email.com", senha: "123456") {
                    ... on SuccessResponse {
                        success
                        message
                        data
                    }
                }
            }`
        };
        
        const loginResponse = await server.executeOperation(loginMutation);
        expect(loginResponse.body.singleResult.data.loginHospede.success).to.equal(true);
        
        const token = JSON.parse(loginResponse.body.singleResult.data.loginHospede.data).token;

        // 3. Criar reserva
        const reservaMutation = {
            query: `mutation {
                criarReserva(hospedeId: 1, quartoId: 2, dataCheckin: "2025-12-20", dataCheckout: "2025-12-25") {
                    ... on SuccessResponse {
                        success
                        message
                        data
                    }
                }
            }`
        };
        
        const reservaResponse = await server.executeOperation(
            reservaMutation,
            { contextValue: { token } }
        );
        
        expect(reservaResponse.body.singleResult.data.criarReserva.success).to.equal(true);
    });

    it('Validar fluxo de consulta de dados GraphQL', async () => {
        // 1. Listar quartos
        const quartosQuery = {
            query: "query { quartos { id numero tipo status } }"
        };
        
        const quartosResponse = await server.executeOperation(quartosQuery);
        expect(quartosResponse.body.singleResult.data.quartos).to.be.an('array');
        expect(quartosResponse.body.singleResult.data.quartos.length).to.be.greaterThan(0);

        // 2. Listar hóspedes
        const hospedesQuery = {
            query: "query { hospedes { id nome email } }"
        };
        
        const hospedesResponse = await server.executeOperation(hospedesQuery);
        expect(hospedesResponse.body.singleResult.data.hospedes).to.be.an('array');
        expect(hospedesResponse.body.singleResult.data.hospedes.length).to.be.greaterThan(0);
    });

});
