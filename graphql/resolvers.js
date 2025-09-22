const hospedeService = require('../service/hospedeService');
const quartoService = require('../service/quartoService');
const reservaService = require('../service/reservaService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'hotel_reservas_secret_key_2023';

// Middleware para verificar JWT
const requireAuth = (context) => {
  const token = context.token;
  if (!token) {
    throw new Error('Token de acesso requerido');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};

const resolvers = {
  Query: {
    // Queries de Hóspedes
    hospedes: () => {
      try {
        const hospedes = hospedeService.listarTodosHospedes();
        return hospedes;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    hospede: (_, { id }) => {
      try {
        const hospede = hospedeService.consultarHospedePorId(id);
        return hospede;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Queries de Quartos
    quartos: () => {
      try {
        const quartos = quartoService.listarTodosQuartos();
        return quartos;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    quarto: (_, { id }) => {
      try {
        const quarto = quartoService.consultarQuartoPorId(id);
        return quarto;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    quartosPorTipo: (_, { tipo }) => {
      try {
        const quartos = quartoService.consultarQuartosPorTipo(tipo);
        return quartos;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    quartosDisponiveis: () => {
      try {
        const quartos = quartoService.consultarQuartosPorStatus('disponível');
        return quartos;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    quartosPorStatus: (_, { status }) => {
      try {
        const quartos = quartoService.consultarQuartosPorStatus(status);
        return quartos;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Queries de Reservas (protegidas por JWT)
    reservas: (_, __, context) => {
      requireAuth(context);
      try {
        const reservas = reservaService.listarTodasReservas();
        return reservas;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    reserva: (_, { id }, context) => {
      requireAuth(context);
      try {
        const reserva = reservaService.consultarReservaPorId(id);
        return reserva;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    reservasPorHospede: (_, { hospedeId }, context) => {
      requireAuth(context);
      try {
        const reservas = reservaService.listarReservasPorHospede(hospedeId);
        return reservas;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },

  Mutation: {
    // Mutations de Hóspedes
    registrarHospede: (_, { nome, email, telefone, senha }) => {
      try {
        const novoHospede = hospedeService.registrarHospede(
          nome,
          email,
          telefone,
          senha
        );
        return {
          success: true,
          message: 'Hóspede registrado com sucesso',
          data: JSON.stringify(novoHospede)
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    loginHospede: (_, { email, senha }) => {
      try {
        const resultado = hospedeService.loginHospede(email, senha);
        return {
          success: true,
          message: 'Login realizado com sucesso',
          data: JSON.stringify(resultado)
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    // Mutations de Reservas (protegidas por JWT)
    criarReserva: (_, { hospedeId, quartoId, dataCheckin, dataCheckout }, context) => {
      requireAuth(context);
      try {
        const novaReserva = reservaService.criarReserva(
          hospedeId,
          quartoId,
          dataCheckin,
          dataCheckout
        );
        return {
          success: true,
          message: 'Reserva criada com sucesso',
          data: JSON.stringify(novaReserva)
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    cancelarReserva: (_, { id }, context) => {
      requireAuth(context);
      try {
        const reservaCancelada = reservaService.cancelarReserva(id);
        return {
          success: true,
          message: 'Reserva cancelada com sucesso',
          data: reservaCancelada
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          data: null
        };
      }
    }
  },

  // Resolver para union type ResponseData
  ResponseData: {
    __resolveType(obj) {
      if (obj.token) return 'SuccessResponse';
      if (obj.success !== undefined) return 'SuccessResponse';
      return 'ErrorResponse';
    }
  }
};

module.exports = resolvers;
