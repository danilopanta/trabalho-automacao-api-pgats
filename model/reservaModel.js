class Reserva {
    constructor(idReserva, idHospede, idQuarto, dataCheckin, dataCheckout) {
        this.idReserva = idReserva;
        this.idHospede = idHospede;
        this.idQuarto = idQuarto;
        this.dataCheckin = dataCheckin;
        this.dataCheckout = dataCheckout;
        this.status = 'ativa';
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
