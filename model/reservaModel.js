class Reserva {
    constructor(id, hospedeId, quartoId, dataCheckin, dataCheckout) {
        this.id = id;
        this.hospedeId = hospedeId;
        this.quartoId = quartoId;
        this.dataCheckin = dataCheckin;
        this.dataCheckout = dataCheckout;
        this.status = 'ativa';
        this.valorTotal = 0; // Será calculado pelo serviço
        this.dataCriacao = new Date().toISOString();
    }
}

// Simulação de banco de dados em memória
let reservas = [];
let proximoIdReserva = 1;

module.exports = {
    Reserva,
    reservas,
    proximoIdReserva: () => proximoIdReserva++,
    resetProximoId: () => { proximoIdReserva = 1; },
    limparReservas: () => { reservas.length = 0; }
};
