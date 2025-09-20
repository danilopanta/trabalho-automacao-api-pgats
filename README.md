# API de Reservas de Hotel

Uma API REST desenvolvida com Node.js e Express para gerenciar reservas de hotel, incluindo cadastro de hóspedes, gerenciamento de quartos e reservas.

## 🚀 Funcionalidades

### Hóspedes
- ✅ Registro de hóspedes (nome, email, telefone)
- ✅ Validação de email único
- ✅ Consulta de todos os hóspedes
- ✅ Consulta de hóspede por ID

### Quartos
- ✅ Listagem de todos os quartos
- ✅ Consulta por tipo (solteiro, casal, suíte)
- ✅ Consulta por status (disponível/ocupado)
- ✅ Consulta de quarto por ID

### Reservas
- ✅ Criação de reservas
- ✅ Validação de disponibilidade
- ✅ Validação de datas (checkout > checkin)
- ✅ Gerenciamento automático de status dos quartos
- ✅ Cancelamento de reservas
- ✅ Listagem de reservas por hóspede

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Swagger** - Documentação da API
- **swagger-jsdoc** - Geração de documentação
- **swagger-ui-express** - Interface da documentação
- **Nodemon** - Desenvolvimento com hot reload

## 📁 Estrutura do Projeto

```
hotel-reservas-api/
├── controller/          # Controladores das rotas
│   ├── hospedeController.js
│   ├── quartoController.js
│   └── reservaController.js
├── service/            # Regras de negócio
│   ├── hospedeService.js
│   ├── quartoService.js
│   └── reservaService.js
├── model/              # Modelos de dados (em memória)
│   ├── hospedeModel.js
│   ├── quartoModel.js
│   └── reservaModel.js
├── test/               # Testes automatizados
│   └── rest/
│       ├── controller/
│       ├── external/
│       └── fixture/
├── app.js              # Configuração do Express e rotas
├── server.js           # Inicialização da API
├── package.json        # Dependências e scripts
└── README.md           # Documentação
```

## 🔧 Instalação

1. **Clone o repositório ou extraia os arquivos**

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute a aplicação**
   
   **Modo desenvolvimento (com hot reload):**
   ```bash
   npm run dev
   ```
   
   **Modo produção:**
   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   - API: http://localhost:3000
   - Documentação Swagger: http://localhost:3000/api-docs

## 📖 Documentação da API

A documentação completa da API está disponível via Swagger UI em:
**http://localhost:3000/api-docs**

### Endpoints Principais

#### Hóspedes
- `POST /hospedes` - Registrar novo hóspede
- `GET /hospedes` - Listar todos os hóspedes
- `GET /hospedes/{id}` - Consultar hóspede por ID

#### Quartos
- `GET /quartos` - Listar todos os quartos
- `GET /quartos/tipo/{tipo}` - Consultar por tipo
- `GET /quartos/status/{status}` - Consultar por status
- `GET /quartos/{id}` - Consultar quarto por ID

#### Reservas
- `POST /reservas` - Criar nova reserva
- `GET /reservas` - Listar todas as reservas
- `GET /reservas/{id}` - Consultar reserva por ID
- `DELETE /reservas/{id}/cancelar` - Cancelar reserva
- `GET /hospedes/{idHospede}/reservas` - Reservas de um hóspede

## 🧪 Exemplos de Uso

### 1. Registrar um Hóspede
```bash
curl -X POST http://localhost:3000/hospedes \\
  -H "Content-Type: application/json" \\
  -d '{
    "nome": "Danilo Panta",
    "email": "panta@email.com",
    "telefone": "(11) 99999-9999"
  }'
```

### 2. Listar Quartos Disponíveis
```bash
curl http://localhost:3000/quartos/status/disponível
```

### 3. Criar uma Reserva
```bash
curl -X POST http://localhost:3000/reservas \\
  -H "Content-Type: application/json" \\
  -d '{
    "idHospede": 1,
    "idQuarto": 1,
    "dataCheckin": "2023-12-01",
    "dataCheckout": "2023-12-05"
  }'
```

### 4. Cancelar uma Reserva
```bash
curl -X DELETE http://localhost:3000/reservas/1/cancelar
```

## 🧪 Testes

A aplicação inclui testes automatizados usando Mocha, Chai e Supertest.

### Executar Testes
```bash
# Testes de controllers
npm test

# Testes de fluxo completo
npm run test:external
```

### Estrutura de Testes
- **Controller Tests:** Testes unitários dos endpoints
- **External Tests:** Testes de fluxo completo da aplicação
- **Fixtures:** Dados de teste organizados

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
- Todos os campos são obrigatórios

### Reservas
- Hóspede deve existir
- Quarto deve existir e estar disponível
- Data de checkout deve ser posterior ao checkin
- Não é possível reservar quarto já ocupado no período
- Ao criar reserva, quarto fica ocupado
- Ao cancelar reserva, quarto volta a ficar disponível

## 🚨 Tratamento de Erros

A API retorna respostas padronizadas com os seguintes códigos:

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Erro de validação
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
  "start": "node server.js",          // Execução em produção
  "dev": "nodemon server.js",         // Desenvolvimento com hot reload
  "test": "mocha test/rest/controller/*.js --timeout 10000",  // Testes unitários
  "test:external": "mocha test/rest/external/*.js --timeout 10000"  // Testes de fluxo
}
```

## 📝 Melhorias Futuras

- [ ] Implementar banco de dados persistente (MongoDB/PostgreSQL)
- [ ] Adicionar autenticação e autorização
- [ ] Adicionar logs estruturados
- [ ] Implementar paginação nas listagens
- [ ] Adicionar filtros avançados
- [ ] Implementar notificações
- [ ] Adicionar relatórios de ocupação

## 👨‍💻 Desenvolvimento

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
