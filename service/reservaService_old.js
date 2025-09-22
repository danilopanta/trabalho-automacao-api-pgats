const { Reserva, reservas, proximoIdReserva } = require('../model/reservaModel');
const hospedeService = require('./hospedeService');
const quartoService = require('./quartoService');

class ReservaService {
    
    // Criar uma nova reserva
    criarReserva(hospedeId, quartoId, dataCheckin, dataCheckout) {
        // Validação de campos obrigatórios
        if (!hospedeId || !quartoId || !dataCheckin || !dataCheckout) {
            throw new Error('Todos os campos são obrigatórios');
        }

        // Validar datas
        const checkin = new Date(dataCheckin);
        const checkout = new Date(dataCheckout);
        
        if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
            throw new Error('Formato de data inválido');
        }

        if (checkout <= checkin) {
            throw new Error('A data de checkout deve ser posterior à data de checkin');
        }

        // Verificar se hóspede existe
        if (!hospedeService.verificarSeHospedeExiste(hospedeId)) {
            throw new Error('Hóspede não encontrado');
        }

        // Verificar se quarto existe
        const quarto = quartoService.consultarQuartoPorId(quartoId);

        // Verificar disponibilidade do quarto nas datas informadas
        if (!this.verificarDisponibilidadeNoPeriodo(quartoId, dataCheckin, dataCheckout)) {
            throw new Error('Quarto não está disponível no período informado');
        }

        // Criar reserva
        const novaReserva = new Reserva(
            proximoIdReserva(),
            hospedeId,
            quartoId,
            dataCheckin,
            dataCheckout
        );

        // Calcular valor total
        const dias = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
        novaReserva.valorTotal = dias * quarto.precoNoite;

        reservas.push(novaReserva);

        // Marcar quarto como ocupado
        quartoService.marcarComoOcupado(quartoId);

        return novaReserva;
    }

    // Verificar disponibilidade do quarto no período
    verificarDisponibilidadeNoPeriodo(idQuarto, dataCheckin, dataCheckout) {
        const checkin = new Date(dataCheckin);
        const checkout = new Date(dataCheckout);

        // Verificar se há reservas ativas conflitantes
        const reservasConflitantes = reservas.filter(r => {
            if (r.idQuarto != idQuarto || r.status !== 'ativa') {
                return false;
            }

            const reservaCheckin = new Date(r.dataCheckin);
            const reservaCheckout = new Date(r.dataCheckout);

            // Verificar sobreposição de datas
            return (checkin < reservaCheckout && checkout > reservaCheckin);
        });

        return reservasConflitantes.length === 0;
    }

    // Listar todas as reservas
    listarTodasReservas() {
        return reservas;
    }

    // Consultar reserva por ID
    consultarReservaPorId(idReserva) {
        const reserva = reservas.find(r => r.idReserva == idReserva);
        if (!reserva) {
            throw new Error('Reserva não encontrada');
        }
        return reserva;
    }

    // Cancelar reserva
    cancelarReserva(idReserva) {
        const reserva = this.consultarReservaPorId(idReserva);
        
        if (reserva.status === 'cancelada') {
            throw new Error('Reserva já foi cancelada');
        }

        // Marcar reserva como cancelada
        reserva.status = 'cancelada';

        // Verificar se há outras reservas ativas para o mesmo quarto
        const outrasReservasAtivas = reservas.filter(r => 
            r.idQuarto === reserva.idQuarto && 
            r.status === 'ativa' && 
            r.idReserva !== reserva.idReserva
        );

        // Se não há outras reservas ativas, marcar quarto como disponível
        if (outrasReservasAtivas.length === 0) {
            quartoService.marcarComoDisponivel(reserva.idQuarto);
        }

        return reserva;
    }

    // Listar reservas por hóspede
    listarReservasPorHospede(idHospede) {
        return reservas.filter(r => r.idHospede == idHospede);
    }
}

module.exports = new ReservaService();
