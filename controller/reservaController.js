const reservaService = require('../service/reservaService');

class ReservaController {
    
    // Criar uma nova reserva
    async criarReserva(req, res) {
        try {
            const { idHospede, idQuarto, dataCheckin, dataCheckout } = req.body;
            const novaReserva = reservaService.criarReserva(idHospede, idQuarto, dataCheckin, dataCheckout);
            
            res.status(201).json({
                success: true,
                message: 'Reserva criada com sucesso',
                data: novaReserva
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Listar todas as reservas
    async listarTodasReservas(req, res) {
        try {
            const reservas = reservaService.listarTodasReservas();
            
            res.status(200).json({
                success: true,
                message: 'Reservas listadas com sucesso',
                data: reservas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Consultar reserva por ID
    async consultarReservaPorId(req, res) {
        try {
            const { id } = req.params;
            const reserva = reservaService.consultarReservaPorId(id);
            
            res.status(200).json({
                success: true,
                message: 'Reserva encontrada',
                data: reserva
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Cancelar reserva
    async cancelarReserva(req, res) {
        try {
            const { id } = req.params;
            const reservaCancelada = reservaService.cancelarReserva(id);
            
            res.status(200).json({
                success: true,
                message: 'Reserva cancelada com sucesso',
                data: reservaCancelada
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Listar reservas por hóspede
    async listarReservasPorHospede(req, res) {
        try {
            const { idHospede } = req.params;
            const reservas = reservaService.listarReservasPorHospede(idHospede);
            
            res.status(200).json({
                success: true,
                message: 'Reservas do hóspede listadas com sucesso',
                data: reservas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new ReservaController();
