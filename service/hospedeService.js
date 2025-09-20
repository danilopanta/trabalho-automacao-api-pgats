const { Hospede, hospedes, proximoIdHospede } = require('../model/hospedeModel');

class HospedeService {
    
    // Registrar um novo hóspede
    registrarHospede(nome, email, telefone) {
        // Validação de campos obrigatórios
        if (!nome || !email || !telefone) {
            throw new Error('Nome, email e telefone são obrigatórios');
        }

        // Validação de email duplicado
        const emailExistente = hospedes.find(h => h.email === email);
        if (emailExistente) {
            throw new Error('Já existe um hóspede cadastrado com este email');
        }

        // Criar novo hóspede
        const novoHospede = new Hospede(proximoIdHospede(), nome, email, telefone);
        hospedes.push(novoHospede);
        
        return novoHospede;
    }

    // Listar todos os hóspedes
    listarTodosHospedes() {
        return hospedes;
    }

    // Consultar hóspede por ID
    consultarHospedePorId(id) {
        const hospede = hospedes.find(h => h.id == id);
        if (!hospede) {
            throw new Error('Hóspede não encontrado');
        }
        return hospede;
    }

    // Verificar se hóspede existe
    verificarSeHospedeExiste(id) {
        return hospedes.some(h => h.id == id);
    }
}

module.exports = new HospedeService();
