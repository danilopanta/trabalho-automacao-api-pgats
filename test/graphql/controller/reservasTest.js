const { expect } = require('chai');
const server = require('../testServer');

describe('Testes GraphQL - Reservas', () => {
    
    let token;
    
    before(async () => {
        // Registrar e fazer login para obter token
        const registerMutation = {
            query: `mutation {
                registrarHospede(nome: "Maria Silva", email: "maria@email.com", telefone: "11888888888", senha: "123456") {
                    ... on SuccessResponse {
                        success
                        message
                        data
                    }
                }
            }`
        };
        
        await server.executeOperation(registerMutation);
        
        const loginMutation = {
            query: `mutation {
                loginHospede(email: "maria@email.com", senha: "123456") {
                    ... on SuccessResponse {
                        success
                        message
                        data
                    }
                }
            }`
        };
        
        const loginResponse = await server.executeOperation(loginMutation);
        
        if (loginResponse.body.singleResult.data.loginHospede.success) {
            token = JSON.parse(loginResponse.body.singleResult.data.loginHospede.data).token;
        }
    });

    it('Validar que é possível criar uma reserva via GraphQL', async () => {
        const mutation = {
            query: `mutation {
                criarReserva(hospedeId: 1, quartoId: 1, dataCheckin: "2025-12-25", dataCheckout: "2025-12-30") {
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
        
        const response = await server.executeOperation(
            mutation,
            { contextValue: { token } }
        );

        expect(response.body.kind).to.equal('single');
        expect(response.body.singleResult.data.criarReserva.success).to.equal(true);
        expect(response.body.singleResult.data.criarReserva.message).to.equal('Reserva criada com sucesso');
        
        const reservaData = JSON.parse(response.body.singleResult.data.criarReserva.data);
        expect(reservaData).to.have.property('id');
        expect(reservaData.hospedeId).to.equal(1);
        expect(reservaData.quartoId).to.equal(1);
    });

    it('Validar que é possível listar reservas via GraphQL', async () => {
        const query = {
            query: "query { reservas { id hospedeId quartoId dataCheckin dataCheckout status valorTotal } }"
        };
        
        const response = await server.executeOperation(
            query,
            { contextValue: { token } }
        );

        expect(response.body.kind).to.equal('single');
        expect(response.body.singleResult.data.reservas).to.be.an('array');
        expect(response.body.singleResult.data.reservas.length).to.be.greaterThan(0);
        expect(response.body.singleResult.data.reservas[0]).to.have.property('id');
        expect(response.body.singleResult.data.reservas[0]).to.have.property('hospedeId');
        expect(response.body.singleResult.data.reservas[0]).to.have.property('quartoId');
    });

});
