class Hospede {
    constructor(id, nome, email, telefone) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}

// Simulação de banco de dados em memória
let hospedes = [];
let proximoIdHospede = 1;

module.exports = {
    Hospede,
    hospedes,
    proximoIdHospede: () => proximoIdHospede++,
    resetProximoId: () => { proximoIdHospede = 1; },
    limparHospedes: () => { hospedes.length = 0; }
};
