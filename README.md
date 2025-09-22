# API de Reservas de Hotel

Uma API REST e GraphQL desenvolvida com Node.js e Express para gerenciar reservas de hotel, incluindo cadastro de hóspedes, gerenciamento de quartos e reservas.

## 🚀 Funcionalidades

### Hóspedes
- ✅ Registro de hóspedes (nome, email, telefone, senha)
- ✅ Autenticação via JWT
- ✅ Validação de email único
- ✅ Consulta de todos os hóspedes
- ✅ Consulta de hóspede por ID

### Quartos
- ✅ Listagem de todos os quartos
- ✅ Consulta por tipo (solteiro, casal, suíte)
- ✅ Consulta por status (disponível/ocupado)
- ✅ Consulta de quarto por ID

### Reservas (🔒 Protegidas por JWT)
- ✅ Criação de reservas
- ✅ Validação de disponibilidade
- ✅ Validação de datas (checkout > checkin)
- ✅ Gerenciamento automático de status dos quartos
- ✅ Cancelamento de reservas
- ✅ Listagem de reservas por hóspede

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Apollo Server v4** - Servidor GraphQL
- **GraphQL** - Linguagem de consulta para APIs
- **JWT (jsonwebtoken)** - Autenticação e autorização
- **bcryptjs** - Hash de senhas
- **Swagger** - Documentação da API REST
- **Mocha/Chai/Supertest** - Framework de testes
- **Nodemon** - Desenvolvimento com hot reload

## 🔗 APIs Disponíveis

### 🌐 API REST
- **URL**: http://localhost:3000
- **Documentação**: http://localhost:3000/api-docs (Swagger)
- **Formato**: JSON
- **Autenticação**: JWT Bearer Token

### ⚡ API GraphQL
- **URL**: http://localhost:4000/graphql
- **Documentação**: [docs/GRAPHQL.md](docs/GRAPHQL.md)
- **Playground**: Disponível no endpoint GraphQL
- **Autenticação**: JWT via Authorization header

## 📁 Estrutura do Projeto

```
hotel-reservas-api/
├── controller/          # Controladores das rotas REST
│   ├── hospedeController.js
│   ├── quartoController.js
│   └── reservaController.js
├── service/            # Regras de negócio (compartilhadas)
│   ├── hospedeService.js
│   ├── quartoService.js
│   └── reservaService.js
├── model/              # Modelos de dados (em memória)
│   ├── hospedeModel.js
│   ├── quartoModel.js
│   └── reservaModel.js
├── middleware/         # Middlewares (autenticação)
│   └── auth.js
├── graphql/            # API GraphQL
│   ├── schema.js       # Definições de tipos GraphQL
│   ├── resolvers.js    # Resolvers GraphQL
│   ├── app.js         # Configuração Apollo Server
│   └── server.js      # Inicialização servidor GraphQL
├── test/               # Testes automatizados
│   ├── rest/          # Testes da API REST
│   │   ├── controller/ # Testes unitários
│   │   ├── external/   # Testes de integração
│   │   └── fixture/    # Dados de teste
│   └── graphql/       # Testes da API GraphQL
│       ├── controller/ # Testes unitários GraphQL
│       ├── external/   # Testes de integração GraphQL
│       └── fixture/    # Fixtures GraphQL
├── docs/              # Documentação
│   └── GRAPHQL.md     # Documentação GraphQL
├── app.js             # Configuração do Express (REST)
├── server.js          # Inicialização da API REST
├── package.json       # Dependências e scripts
├── README.md          # Documentação principal
└── AUTENTICACAO.md    # Guia de autenticação JWT
```

## 🔧 Instalação

1. **Clone o repositório ou extraia os arquivos**

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute as aplicações**
   
   **API REST (Porta 3000):**
   ```bash
   # Modo desenvolvimento (com hot reload)
   npm run dev
   
   # Modo produção
   npm start
   ```
   
   **API GraphQL (Porta 4000):**
   ```bash
   # Modo desenvolvimento (com hot reload)
   npm run dev-graphql
   
   # Modo produção
   npm run start-graphql
   ```

4. **Acesse as aplicações**
   - **API REST**: http://localhost:3000
   - **Documentação Swagger**: http://localhost:3000/api-docs
   - **API GraphQL**: http://localhost:4000/graphql
   - **Documentação GraphQL**: [docs/GRAPHQL.md](docs/GRAPHQL.md)

## 🧪 Execução de Testes

A aplicação possui uma suíte completa de testes automatizados para REST e GraphQL.

### Scripts Disponíveis

#### Testes REST
```bash
# Executar todos os testes REST com relatório HTML
npm run test-rest

# Executar apenas testes de controllers REST (testes unitários)
npm run test-rest-controller

# Executar apenas testes externos REST (testes de integração)
npm run test-rest-external
```

#### Testes GraphQL
```bash
# Executar todos os testes GraphQL com relatório HTML
npm run test-graphql

# Executar apenas testes de controllers GraphQL (testes unitários)
npm run test-graphql-controller

# Executar apenas testes externos GraphQL (testes de integração)
npm run test-graphql-external
```

#### Testes Gerais
```bash
# Executar TODOS os testes (REST + GraphQL) com relatório
npm run test-all

# Executar todos os testes com relatório
npm test
```

### Relatórios de Teste

Os scripts que incluem `--reporter mochawesome` geram relatórios em HTML com:
- **Resultados detalhados** de cada teste
- **Tempo de execução** de cada caso
- **Gráficos visuais** de taxa de sucesso
- **Logs de erros** detalhados

Os relatórios são salvos em: `mochawesome-report/mochawesome.html`

### Estrutura dos Testes

#### Testes REST
- **`test/rest/controller/`** - Testes unitários de cada controller
  - `hospedesTest.js` - Testes de hóspedes (6 testes)
  - `quartosTest.js` - Testes de quartos (6 testes)
  - `reservasTest.js` - Testes de reservas (8 testes)

- **`test/rest/external/`** - Testes de fluxo completo
  - `fluxoCompletoTest.js` - Testes de integração (3 testes)

#### Testes GraphQL
- **`test/graphql/controller/`** - Testes unitários GraphQL
  - `hospedesTest.js` - Testes de hóspedes GraphQL (6 testes)
  - `quartosTest.js` - Testes de quartos GraphQL (5 testes)
  - `reservasTest.js` - Testes de reservas GraphQL (8 testes)

- **`test/graphql/external/`** - Testes de integração GraphQL
  - `hospedesTest.js` - Testes externos de hóspedes (6 testes)
  - `quartosTest.js` - Testes externos de quartos (7 testes)
  - `reservasTest.js` - Testes externos de reservas (9 testes)

**Total: REST (23 testes) + GraphQL (41 testes) = 64 testes** cobrindo todas as funcionalidades das APIs.

## 📖 Documentação das APIs

### 🌐 API REST
A documentação completa da API REST está disponível via Swagger UI em:
**http://localhost:3000/api-docs**

### ⚡ API GraphQL
A documentação completa da API GraphQL está disponível em:
**[docs/GRAPHQL.md](docs/GRAPHQL.md)**

#### GraphQL Playground
Acesse http://localhost:4000/graphql para usar o playground interativo do GraphQL.

### Endpoints Principais

#### API REST - Hóspedes
- `POST /hospedes` - Registrar novo hóspede
- `POST /hospedes/login` - Login do hóspede (retorna JWT)
- `GET /hospedes` - Listar todos os hóspedes
- `GET /hospedes/{id}` - Consultar hóspede por ID

#### API REST - Quartos
- `GET /quartos` - Listar todos os quartos
- `GET /quartos/tipo/{tipo}` - Consultar por tipo
- `GET /quartos/status/{status}` - Consultar por status
- `GET /quartos/{id}` - Consultar quarto por ID

#### API REST - Reservas (🔒 Requer Autenticação)
- `POST /reservas` - Criar nova reserva
- `GET /reservas` - Listar todas as reservas
- `GET /reservas/{id}` - Consultar reserva por ID
- `DELETE /reservas/{id}/cancelar` - Cancelar reserva
- `GET /hospedes/{idHospede}/reservas` - Reservas de um hóspede

#### API GraphQL - Principais Operações
```graphql
# Queries
query { hospedes { id nome email } }
query { quartos { id numero tipo precoNoite status } }
query { reservas { id hospedeId quartoId dataCheckin dataCheckout } } # 🔒

# Mutations
mutation { registrarHospede(nome: "Nome", email: "email@teste.com", senha: "123") }
mutation { loginHospede(email: "email@teste.com", senha: "123") }
mutation { criarReserva(hospedeId: 1, quartoId: 1, dataCheckin: "2024-12-25", dataCheckout: "2024-12-30") } # 🔒
```

## 🧪 Exemplos de Uso

### API REST

#### 1. Registrar um Hóspede
```bash
curl -X POST http://localhost:3000/hospedes \\
  -H "Content-Type: application/json" \\
  -d '{
    "nome": "Danilo Panta",
    "email": "panta@email.com",
    "telefone": "(11) 99999-9999",
    "senha": "minhasenha123"
  }'
```

#### 2. Fazer Login (obter JWT Token)
```bash
curl -X POST http://localhost:3000/hospedes/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "panta@email.com",
    "senha": "minhasenha123"
  }'
```

#### 3. Listar Quartos Disponíveis
```bash
curl http://localhost:3000/quartos/status/disponível
```

#### 4. Criar uma Reserva (🔒 Requer Token)
```bash
curl -X POST http://localhost:3000/reservas \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \\
  -d '{
    "idHospede": 1,
    "idQuarto": 1,
    "dataCheckin": "2023-12-01",
    "dataCheckout": "2023-12-05"
  }'
```

### API GraphQL

#### 1. Registrar Hóspede via GraphQL
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

#### 2. Login via GraphQL
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

#### 3. Listar Quartos via GraphQL
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

#### 4. Criar Reserva via GraphQL (🔒 Requer Token)
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
  }
}
```

*Para GraphQL, inclua o header: `Authorization: Bearer SEU_TOKEN_AQUI`*

## 🔐 Autenticação JWT

Para acessar as rotas de reserva (tanto REST quanto GraphQL), você precisa:

1. **Registrar** um hóspede com senha
2. **Fazer login** para obter o token JWT  
3. **Incluir o token** no header `Authorization: Bearer <token>`

### REST API
```bash
curl -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### GraphQL API
```javascript
// Headers da requisição
{
  "Authorization": "Bearer SEU_TOKEN_JWT",
  "Content-Type": "application/json"
}
```

**Consulte o arquivo `AUTENTICACAO.md` para instruções detalhadas.**

## 🗄️ Banco de Dados

A aplicação utiliza armazenamento em memória para fins de demonstração. Os dados são perdidos quando a aplicação é reiniciada.

### Dados Iniciais

**Quartos pré-cadastrados:**
- Quarto 101 - Solteiro - Disponível
- Quarto 102 - Casal - Disponível  
- Quarto 103 - Suíte - Disponível
- Quarto 201 - Solteiro - Disponível
- Quarto 202 - Casal - Disponível
- Quarto 203 - Suíte - Disponível

## ⚙️ Regras de Negócio

### Hóspedes
- Email deve ser único
- Todos os campos são obrigatórios (nome, email, telefone, senha)
- Senhas são armazenadas com hash bcrypt

### Reservas
- Hóspede deve existir
- Quarto deve existir e estar disponível
- Data de checkout deve ser posterior ao checkin
- Não é possível reservar quarto já ocupado no período
- Ao criar reserva, quarto fica ocupado
- Ao cancelar reserva, quarto volta a ficar disponível
- **Todas as operações de reserva requerem autenticação JWT**

## 🚨 Tratamento de Erros

A API retorna respostas padronizadas com os seguintes códigos:

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Erro de validação
- **401** - Token de acesso requerido
- **403** - Token inválido ou expirado
- **404** - Recurso não encontrado
- **500** - Erro interno do servidor

### Formato de Resposta
```json
{
  "success": true/false,
  "message": "Descrição da operação",
  "data": {} // Dados retornados (quando aplicável)
}
```

## 🔄 Scripts Disponíveis

```json
{
  "start": "node server.js",                    // API REST em produção
  "dev": "nodemon server.js",                   // API REST em desenvolvimento
  "start-graphql": "node graphql/server.js",    // API GraphQL em produção
  "dev-graphql": "nodemon graphql/server.js",   // API GraphQL em desenvolvimento
  "test-rest": "mocha \"test/rest/**/*.js\"",   // Testes da API REST
  "test-graphql": "mocha \"test/graphql/**/*.js\"", // Testes da API GraphQL
  "test-all": "mocha 'test/**/*.js'"            // Todos os testes
}
```

## 📝 Melhorias Futuras

### API REST
- [ ] Implementar banco de dados persistente (MongoDB/PostgreSQL)
- [x] ~~Adicionar autenticação e autorização~~ ✅ **Implementado**
- [x] ~~Implementar testes automatizados~~ ✅ **Implementado**
- [ ] Adicionar logs estruturados
- [ ] Implementar paginação nas listagens
- [ ] Adicionar filtros avançados

### API GraphQL
- [x] ~~Implementar API GraphQL completa~~ ✅ **Implementado**
- [x] ~~Adicionar autenticação JWT no GraphQL~~ ✅ **Implementado**  
- [x] ~~Criar testes automatizados GraphQL~~ ✅ **Implementado**
- [ ] Implementar subscriptions para atualizações em tempo real
- [ ] Adicionar cache com DataLoader
- [ ] Implementar paginação com cursors
- [ ] Adicionar validações mais robustas

### Geral
- [ ] Implementar notificações
- [ ] Adicionar relatórios de ocupação
- [ ] Implementar refresh tokens
- [ ] Adicionar roles de usuário (admin, hóspede)
- [ ] Implementar rate limiting
- [ ] Adicionar monitoramento e métricas

## 👨‍💻 Desenvolvimento

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
