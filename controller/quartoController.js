const quartoService = require('../service/quartoService');

class QuartoController {
    
    // Listar todos os quartos
    async listarTodosQuartos(req, res) {
        try {
            const quartos = quartoService.listarTodosQuartos();
            
            res.status(200).json({
                success: true,
                message: 'Quartos listados com sucesso',
                data: quartos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Consultar quartos por tipo
    async consultarQuartosPorTipo(req, res) {
        try {
            const { tipo } = req.params;
            const quartos = quartoService.consultarQuartosPorTipo(tipo);
            
            res.status(200).json({
                success: true,
                message: `Quartos do tipo ${tipo} listados com sucesso`,
                data: quartos
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Consultar quartos por status
    async consultarQuartosPorStatus(req, res) {
        try {
            const { status } = req.params;
            const quartos = quartoService.consultarQuartosPorStatus(status);
            
            res.status(200).json({
                success: true,
                message: `Quartos com status ${status} listados com sucesso`,
                data: quartos
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Consultar quarto por ID
    async consultarQuartoPorId(req, res) {
        try {
            const { id } = req.params;
            const quarto = quartoService.consultarQuartoPorId(id);
            
            res.status(200).json({
                success: true,
                message: 'Quarto encontrado',
                data: quarto
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new QuartoController();
