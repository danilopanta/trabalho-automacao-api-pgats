# API de Reservas de Hotel

Uma API REST desenvolvida com Node.js e Express para gerenciar reservas de hotel, incluindo cadastro de hóspedes, gerenciamento de quartos e reservas.

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
- **JWT (jsonwebtoken)** - Autenticação e autorização
- **bcryptjs** - Hash de senhas
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
├── middleware/         # Middlewares (autenticação)
│   └── auth.js
├── app.js              # Configuração do Express e rotas
├── server.js           # Inicialização da API
├── package.json        # Dependências e scripts
├── README.md           # Documentação
└── AUTENTICACAO.md     # Guia de autenticação JWT
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
- `POST /hospedes/login` - Login do hóspede (retorna JWT)
- `GET /hospedes` - Listar todos os hóspedes
- `GET /hospedes/{id}` - Consultar hóspede por ID

#### Quartos
- `GET /quartos` - Listar todos os quartos
- `GET /quartos/tipo/{tipo}` - Consultar por tipo
- `GET /quartos/status/{status}` - Consultar por status
- `GET /quartos/{id}` - Consultar quarto por ID

#### Reservas (🔒 Requer Autenticação)
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
    "telefone": "(11) 99999-9999",
    "senha": "minhasenha123"
  }'
```

### 2. Fazer Login (obter JWT Token)
```bash
curl -X POST http://localhost:3000/hospedes/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "panta@email.com",
    "senha": "minhasenha123"
  }'
```

### 3. Listar Quartos Disponíveis
```bash
curl http://localhost:3000/quartos/status/disponível
```

### 4. Criar uma Reserva (🔒 Requer Token)
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

### 5. Cancelar uma Reserva (🔒 Requer Token)
```bash
curl -X DELETE http://localhost:3000/reservas/1/cancelar \\
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🔐 Autenticação JWT

Para acessar as rotas de reserva, você precisa:

1. **Registrar** um hóspede com senha
2. **Fazer login** para obter o token JWT  
3. **Incluir o token** no header `Authorization: Bearer <token>`

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
  "start": "node server.js",        // Execução em produção
  "dev": "nodemon server.js",       // Desenvolvimento com hot reload
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 📝 Melhorias Futuras

- [ ] Implementar banco de dados persistente (MongoDB/PostgreSQL)
- [x] ~~Adicionar autenticação e autorização~~ ✅ **Implementado**
- [ ] Implementar testes automatizados
- [ ] Adicionar logs estruturados
- [ ] Implementar paginação nas listagens
- [ ] Adicionar filtros avançados
- [ ] Implementar notificações
- [ ] Adicionar relatórios de ocupação
- [ ] Implementar refresh tokens
- [ ] Adicionar roles de usuário (admin, hóspede)

## 👨‍💻 Desenvolvimento

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
