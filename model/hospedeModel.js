class Hospede {
    constructor(id, nome, email, telefone, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha; // Armazenar a senha hash, não a senha em texto puro
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
