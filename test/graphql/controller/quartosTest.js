const { expect } = require('chai');
const server = require('../testServer');

describe('Testes GraphQL - Quartos', () => {

    it('Validar que é possível listar quartos via GraphQL', async () => {
        const query = {
            query: "query { quartos { id numero tipo precoNoite status descricao } }"
        };
        
        const response = await server.executeOperation(query);

        expect(response.body.kind).to.equal('single');
        expect(response.body.singleResult.data.quartos).to.be.an('array');
        expect(response.body.singleResult.data.quartos.length).to.be.greaterThan(0);
        expect(response.body.singleResult.data.quartos[0]).to.have.property('numero');
        expect(response.body.singleResult.data.quartos[0]).to.have.property('tipo');
        expect(response.body.singleResult.data.quartos[0]).to.have.property('precoNoite');
    });

    it('Validar que é possível consultar quarto por ID via GraphQL', async () => {
        const query = {
            query: "query($id: Int!) { quarto(id: $id) { id numero tipo precoNoite status descricao } }",
            variables: { id: 1 }
        };
        
        const response = await server.executeOperation(query);

        expect(response.body.kind).to.equal('single');
        expect(response.body.singleResult.data.quarto).to.not.be.null;
        expect(response.body.singleResult.data.quarto.id).to.equal(1);
        expect(response.body.singleResult.data.quarto).to.have.property('numero');
        expect(response.body.singleResult.data.quarto).to.have.property('tipo');
    });

});
