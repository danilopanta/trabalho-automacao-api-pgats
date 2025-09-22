const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipos base
  type Hospede {
    id: Int!
    nome: String!
    email: String!
    telefone: String
    senha: String
    dataCadastro: String
  }

  type Quarto {
    id: Int!
    numero: String!
    tipo: String!
    precoNoite: Float!
    status: String!
    descricao: String
  }

  type Reserva {
    id: Int!
    hospedeId: Int!
    quartoId: Int!
    dataCheckin: String!
    dataCheckout: String!
    valorTotal: Float!
    status: String!
    dataCriacao: String
  }

  # Responses para autenticação
  type LoginResponse {
    hospede: Hospede!
    token: String!
  }

  type SuccessResponse {
    success: Boolean!
    message: String!
    data: String
  }

  type ErrorResponse {
    success: Boolean!
    message: String!
  }

  union ResponseData = SuccessResponse | ErrorResponse

  # Inputs para Mutations
  input HospedeInput {
    nome: String!
    email: String!
    telefone: String!
    senha: String!
  }

  input LoginInput {
    email: String!
    senha: String!
  }

  input ReservaInput {
    idHospede: Int!
    idQuarto: Int!
    dataCheckin: String!
    dataCheckout: String!
  }

  # Queries
  type Query {
    # Hóspedes
    hospedes: [Hospede!]!
    hospede(id: Int!): Hospede

    # Quartos
    quartos: [Quarto!]!
    quarto(id: Int!): Quarto
    quartosPorTipo(tipo: String!): [Quarto!]!
    quartosPorStatus(status: String!): [Quarto!]!
    quartosDisponiveis: [Quarto!]!

    # Reservas (protegidas por JWT)
    reservas: [Reserva!]!
    reserva(id: Int!): Reserva
    reservasPorHospede(hospedeId: Int!): [Reserva!]!
  }

  # Mutations
  type Mutation {
    # Hóspedes
    registrarHospede(nome: String!, email: String!, telefone: String, senha: String!): ResponseData!
    loginHospede(email: String!, senha: String!): ResponseData!

    # Reservas (protegidas por JWT)
    criarReserva(hospedeId: Int!, quartoId: Int!, dataCheckin: String!, dataCheckout: String!): ResponseData!
    cancelarReserva(id: Int!): ResponseData!
  }
`;

module.exports = typeDefs;
