const { Quarto, quartos } = require('../model/quartoModel');

class QuartoService {
    
    // Listar todos os quartos
    listarTodosQuartos() {
        return quartos;
    }

    // Consultar quartos por tipo
    consultarQuartosPorTipo(tipo) {
        const tiposValidos = ['solteiro', 'casal', 'suíte'];
        if (!tiposValidos.includes(tipo)) {
            throw new Error('Tipo de quarto inválido. Tipos válidos: solteiro, casal, suíte');
        }
        
        return quartos.filter(q => q.tipo === tipo);
    }

    // Consultar quartos por status
    consultarQuartosPorStatus(status) {
        const statusValidos = ['disponível', 'ocupado'];
        if (!statusValidos.includes(status)) {
            throw new Error('Status inválido. Status válidos: disponível, ocupado');
        }
        
        return quartos.filter(q => q.status === status);
    }

    // Consultar quarto por ID
    consultarQuartoPorId(id) {
        const quarto = quartos.find(q => q.id == id);
        if (!quarto) {
            throw new Error('Quarto não encontrado');
        }
        return quarto;
    }

    // Verificar se quarto está disponível
    verificarDisponibilidade(id) {
        const quarto = this.consultarQuartoPorId(id);
        return quarto.status === 'disponível';
    }

    // Marcar quarto como ocupado
    marcarComoOcupado(id) {
        const quarto = this.consultarQuartoPorId(id);
        quarto.status = 'ocupado';
        return quarto;
    }

    // Marcar quarto como disponível
    marcarComoDisponivel(id) {
        const quarto = this.consultarQuartoPorId(id);
        quarto.status = 'disponível';
        return quarto;
    }
}

module.exports = new QuartoService();
