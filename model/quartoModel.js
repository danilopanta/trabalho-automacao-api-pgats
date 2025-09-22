class Quarto {
    constructor(id, numero, tipo, precoNoite, status = 'disponível', descricao = '') {
        this.id = id;
        this.numero = numero;
        this.tipo = tipo;
        this.precoNoite = precoNoite;
        this.status = status;
        this.descricao = descricao;
    }
}

// Simulação de banco de dados em memória
let quartos = [
    new Quarto(1, 101, 'solteiro', 150.00, 'disponível', 'Quarto simples com cama de solteiro'),
    new Quarto(2, 102, 'casal', 200.00, 'disponível', 'Quarto confortável para casal'),
    new Quarto(3, 103, 'suíte', 350.00, 'disponível', 'Suíte luxuosa com banheira'),
    new Quarto(4, 201, 'solteiro', 150.00, 'disponível', 'Quarto simples com cama de solteiro'),
    new Quarto(5, 202, 'casal', 200.00, 'disponível', 'Quarto confortável para casal'),
    new Quarto(6, 203, 'suíte', 350.00, 'disponível', 'Suíte luxuosa com banheira'),
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
            new Quarto(1, 101, 'solteiro', 150.00, 'disponível', 'Quarto simples com cama de solteiro'),
            new Quarto(2, 102, 'casal', 200.00, 'disponível', 'Quarto confortável para casal'),
            new Quarto(3, 103, 'suíte', 350.00, 'disponível', 'Suíte luxuosa com banheira'),
            new Quarto(4, 201, 'solteiro', 150.00, 'disponível', 'Quarto simples com cama de solteiro'),
            new Quarto(5, 202, 'casal', 200.00, 'disponível', 'Quarto confortável para casal'),
            new Quarto(6, 203, 'suíte', 350.00, 'disponível', 'Suíte luxuosa com banheira')
        );
    }
};
