const hospedeService = require('../service/hospedeService');

class HospedeController {
    
    // Registrar um novo hóspede
    async registrarHospede(req, res) {
        try {
            const { nome, email, telefone } = req.body;
            const novoHospede = hospedeService.registrarHospede(nome, email, telefone);
            
            res.status(201).json({
                success: true,
                message: 'Hóspede registrado com sucesso',
                data: novoHospede
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Listar todos os hóspedes
    async listarTodosHospedes(req, res) {
        try {
            const hospedes = hospedeService.listarTodosHospedes();
            
            res.status(200).json({
                success: true,
                message: 'Hóspedes listados com sucesso',
                data: hospedes
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Consultar hóspede por ID
    async consultarHospedePorId(req, res) {
        try {
            const { id } = req.params;
            const hospede = hospedeService.consultarHospedePorId(id);
            
            res.status(200).json({
                success: true,
                message: 'Hóspede encontrado',
                data: hospede
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new HospedeController();
