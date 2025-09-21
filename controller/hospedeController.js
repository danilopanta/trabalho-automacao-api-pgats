const hospedeService = require('../service/hospedeService');

class HospedeController {
    
    // Registrar um novo hóspede
    async registrarHospede(req, res) {
        try {
            const { nome, email, telefone, senha } = req.body;
            const novoHospede = hospedeService.registrarHospede(nome, email, telefone, senha);
            
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

    // Login do hóspede
    async loginHospede(req, res) {
        try {
            const { email, senha } = req.body;
            const resultado = hospedeService.loginHospede(email, senha);
            
            res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                data: resultado
            });
        } catch (error) {
            res.status(401).json({
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
