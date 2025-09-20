class Quarto {
    constructor(id, numero, tipo, status = 'disponível') {
        this.id = id;
        this.numero = numero;
        this.tipo = tipo;
        this.status = status;
    }
}

// Simulação de banco de dados em memória
let quartos = [
    new Quarto(1, 101, 'solteiro', 'disponível'),
    new Quarto(2, 102, 'casal', 'disponível'),
    new Quarto(3, 103, 'suíte', 'disponível'),
    new Quarto(4, 201, 'solteiro', 'disponível'),
    new Quarto(5, 202, 'casal', 'disponível'),
    new Quarto(6, 203, 'suíte', 'disponível'),
];

let proximoIdQuarto = 7;

module.exports = {
    Quarto,
    quartos,
    proximoIdQuarto: () => proximoIdQuarto++,
    resetProximoId: () => { proximoIdQuarto = 7; },
    limparQuartos: () => { 
        quartos.length = 0;
        // Recriar quartos padrão
        quartos.push(
            new Quarto(1, 101, 'solteiro', 'disponível'),
            new Quarto(2, 102, 'casal', 'disponível'),
            new Quarto(3, 103, 'suíte', 'disponível'),
            new Quarto(4, 201, 'solteiro', 'disponível'),
            new Quarto(5, 202, 'casal', 'disponível'),
            new Quarto(6, 203, 'suíte', 'disponível')
        );
    }
};
