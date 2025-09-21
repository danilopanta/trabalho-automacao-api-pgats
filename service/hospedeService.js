const { Hospede, hospedes, proximoIdHospede } = require('../model/hospedeModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');

class HospedeService {
    
    // Registrar um novo hóspede
    registrarHospede(nome, email, telefone, senha) {
        // Validação de campos obrigatórios
        if (!nome || !email || !telefone || !senha) {
            throw new Error('Nome, email, telefone e senha são obrigatórios');
        }

        // Validação de email duplicado
        const emailExistente = hospedes.find(h => h.email === email);
        if (emailExistente) {
            throw new Error('Já existe um hóspede cadastrado com este email');
        }

        // Hash da senha
        const senhaHash = bcrypt.hashSync(senha, 10);

        // Criar novo hóspede
        const novoHospede = new Hospede(proximoIdHospede(), nome, email, telefone, senhaHash);
        hospedes.push(novoHospede);
        
        // Retornar sem a senha
        const { senha: _, ...hospedeResponse } = novoHospede;
        return hospedeResponse;
    }

    // Login do hóspede
    loginHospede(email, senha) {
        // Validação de campos obrigatórios
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios');
        }

        // Buscar hóspede por email
        const hospede = hospedes.find(h => h.email === email);
        if (!hospede) {
            throw new Error('Email ou senha inválidos');
        }

        // Verificar senha
        const senhaValida = bcrypt.compareSync(senha, hospede.senha);
        if (!senhaValida) {
            throw new Error('Email ou senha inválidos');
        }

        // Gerar token JWT
        const token = generateToken(hospede);

        // Retornar dados do hóspede e token (sem senha)
        const { senha: _, ...hospedeData } = hospede;
        return {
            hospede: hospedeData,
            token
        };
    }

    // Listar todos os hóspedes
    listarTodosHospedes() {
        // Retornar sem as senhas
        return hospedes.map(hospede => {
            const { senha, ...hospedeData } = hospede;
            return hospedeData;
        });
    }

    // Consultar hóspede por ID
    consultarHospedePorId(id) {
        const hospede = hospedes.find(h => h.id == id);
        if (!hospede) {
            throw new Error('Hóspede não encontrado');
        }
        
        // Retornar sem a senha
        const { senha, ...hospedeData } = hospede;
        return hospedeData;
    }

    // Verificar se hóspede existe
    verificarSeHospedeExiste(id) {
        return hospedes.some(h => h.id == id);
    }
}

module.exports = new HospedeService();
