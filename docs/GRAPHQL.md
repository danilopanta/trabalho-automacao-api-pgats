# API GraphQL - Hotel Reservas

Esta documentação descreve a API GraphQL para o sistema de gerenciamento de reservas de hotel.

## 🚀 Iniciando o Servidor GraphQL

```bash
# Instalar dependências
npm install

# Iniciar servidor GraphQL
npm run start-graphql

# Iniciar em modo desenvolvimento
npm run dev-graphql
```

O servidor GraphQL estará disponível em: `http://localhost:4000/graphql`

## 📋 Schema GraphQL

### Types

#### Hospede
```graphql
type Hospede {
  id: Int!
  nome: String!
  email: String!
  telefone: String
  senha: String
  dataCadastro: String
}
```

#### Quarto
```graphql
type Quarto {
  id: Int!
  numero: String!
  tipo: String!
  precoNoite: Float!
  status: String!
  descricao: String
}
```

#### Reserva
```graphql
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
```

#### Response Types
```graphql
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
```

### Queries

#### Hóspedes
```graphql
# Listar todos os hóspedes
query {
  hospedes {
    id
    nome
    email
    telefone
    dataCadastro
  }
}

# Buscar hóspede por ID
query($id: Int!) {
  hospede(id: $id) {
    id
    nome
    email
    telefone
    dataCadastro
  }
}
```

#### Quartos
```graphql
# Listar todos os quartos
query {
  quartos {
    id
    numero
    tipo
    precoNoite
    status
    descricao
  }
}

# Buscar quarto por ID
query($id: Int!) {
  quarto(id: $id) {
    id
    numero
    tipo
    precoNoite
    status
    descricao
  }
}

# Buscar quartos por tipo
query($tipo: String!) {
  quartosPorTipo(tipo: $tipo) {
    id
    numero
    tipo
    precoNoite
    status
    descricao
  }
}

# Listar quartos disponíveis
query {
  quartosDisponiveis {
    id
    numero
    tipo
    precoNoite
    status
    descricao
  }
}
```

#### Reservas (🔒 Requer Autenticação)
```graphql
# Listar todas as reservas
query {
  reservas {
    id
    hospedeId
    quartoId
    dataCheckin
    dataCheckout
    valorTotal
    status
    dataCriacao
  }
}

# Buscar reserva por ID
query($id: Int!) {
  reserva(id: $id) {
    id
    hospedeId
    quartoId
    dataCheckin
    dataCheckout
    valorTotal
    status
    dataCriacao
  }
}

# Buscar reservas por hóspede
query($hospedeId: Int!) {
  reservasPorHospede(hospedeId: $hospedeId) {
    id
    hospedeId
    quartoId
    dataCheckin
    dataCheckout
    valorTotal
    status
    dataCriacao
  }
}
```

### Mutations

#### Hóspedes
```graphql
# Registrar novo hóspede
mutation($nome: String!, $email: String!, $telefone: String, $senha: String!) {
  registrarHospede(nome: $nome, email: $email, telefone: $telefone, senha: $senha) {
    ... on SuccessResponse {
      success
      message
      data
    }
    ... on ErrorResponse {
      success
      message
    }
  }
}

# Login de hóspede
mutation($email: String!, $senha: String!) {
  loginHospede(email: $email, senha: $senha) {
    ... on SuccessResponse {
      success
      message
      data
    }
    ... on ErrorResponse {
      success
      message
    }
  }
}
```

#### Reservas (🔒 Requer Autenticação)
```graphql
# Criar nova reserva
mutation($hospedeId: Int!, $quartoId: Int!, $dataCheckin: String!, $dataCheckout: String!) {
  criarReserva(
    hospedeId: $hospedeId, 
    quartoId: $quartoId, 
    dataCheckin: $dataCheckin, 
    dataCheckout: $dataCheckout
  ) {
    ... on SuccessResponse {
      success
      message
      data
    }
    ... on ErrorResponse {
      success
      message
    }
  }
}
```

## 🔐 Autenticação

A autenticação é feita via JWT (JSON Web Token). Para acessar endpoints protegidos:

1. Faça login para obter o token:
```graphql
mutation {
  loginHospede(email: "usuario@email.com", senha: "123456") {
    ... on SuccessResponse {
      success
      message
      data
    }
  }
}
```

2. Inclua o token no header das requisições:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Endpoints que Requerem Autenticação
- Todas as queries de reservas
- Todas as mutations de reservas

## 📝 Exemplos de Uso

### 1. Registrar Hóspede
```graphql
mutation {
  registrarHospede(
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    senha: "123456"
  ) {
    ... on SuccessResponse {
      success
      message
      data
    }
    ... on ErrorResponse {
      success
      message
    }
  }
}
```

### 2. Fazer Login
```graphql
mutation {
  loginHospede(email: "joao@email.com", senha: "123456") {
    ... on SuccessResponse {
      success
      message
      data
    }
  }
}
```

### 3. Listar Quartos Disponíveis
```graphql
query {
  quartosDisponiveis {
    id
    numero
    tipo
    precoNoite
    status
    descricao
  }
}
```

### 4. Criar Reserva (Com Autenticação)
```graphql
mutation {
  criarReserva(
    hospedeId: 1,
    quartoId: 1,
    dataCheckin: "2024-12-25",
    dataCheckout: "2024-12-30"
  ) {
    ... on SuccessResponse {
      success
      message
      data
    }
    ... on ErrorResponse {
      success
      message
    }
  }
}
```

## 🧪 Executando Testes

```bash
# Testes GraphQL controller
npm run test-graphql-controller

# Testes GraphQL externos
npm run test-graphql-external

# Todos os testes GraphQL
npm run test-graphql

# Todos os testes (REST + GraphQL)
npm run test-all
```

## 🛠️ Tecnologias Utilizadas

- **Apollo Server v4**: Servidor GraphQL moderno
- **GraphQL**: Linguagem de consulta para APIs
- **Express.js**: Framework web para Node.js
- **JWT**: Autenticação via JSON Web Tokens
- **Mocha/Chai**: Framework de testes
- **Supertest**: Testes de API

## 📊 Estrutura do Projeto GraphQL

```
graphql/
├── schema.js          # Definições de tipos GraphQL
├── resolvers.js       # Lógica de resolvers
├── app.js            # Configuração do Apollo Server
└── server.js         # Inicialização do servidor

test/graphql/
├── controller/       # Testes unitários
├── external/         # Testes end-to-end
└── fixture/          # Dados de teste
```

## 🔄 Union Types

A API utiliza Union Types para responses flexíveis:

```graphql
union ResponseData = SuccessResponse | ErrorResponse
```

Isso permite retornar diferentes tipos de resposta baseados no resultado da operação, mantendo a tipagem forte do GraphQL.

## 📈 Próximos Passos

- [ ] Implementar subscriptions para atualizações em tempo real
- [ ] Adicionar cache com DataLoader
- [ ] Implementar paginação nas queries
- [ ] Adicionar validações mais robustas
- [ ] Metrics e observabilidade
