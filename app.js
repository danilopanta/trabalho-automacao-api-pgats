const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar controllers
const hospedeController = require('./controller/hospedeController');
const quartoController = require('./controller/quartoController');
const reservaController = require('./controller/reservaController');

// Importar middleware de autenticação
const { authenticateToken } = require('./middleware/auth');

const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Reservas de Hotel',
            version: '1.0.0',
            description: 'API REST para gerenciamento de reservas de hotel',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: ['./app.js'], // Arquivos onde estão as definições da API
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'API de Reservas de Hotel',
        version: '1.0.0',
        documentation: '/api-docs'
    });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Hospede:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - senha
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do hóspede
 *         nome:
 *           type: string
 *           description: Nome completo do hóspede
 *         email:
 *           type: string
 *           description: Email do hóspede
 *         telefone:
 *           type: string
 *           description: Telefone do hóspede
 *         senha:
 *           type: string
 *           description: Senha do hóspede
 *       example:
 *         id: 1
 *         nome: Danilo Panta
 *         email: panta@email.com
 *         telefone: (11) 99999-9999
 *         senha: minhasenha123
 *     
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           description: Email do hóspede
 *         senha:
 *           type: string
 *           description: Senha do hóspede
 *       example:
 *         email: panta@email.com
 *         senha: minhasenha123
 *     
 *     TokenResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             hospede:
 *               $ref: '#/components/schemas/Hospede'
 *             token:
 *               type: string
 *               description: JWT Token
 *       example:
 *         success: true
 *         message: Login realizado com sucesso
 *         data:
 *           hospede:
 *             id: 1
 *             nome: Danilo Panta
 *             email: panta@email.com
 *             telefone: (11) 99999-9999
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     
 *     Quarto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do quarto
 *         numero:
 *           type: integer
 *           description: Número do quarto
 *         tipo:
 *           type: string
 *           enum: [solteiro, casal, suíte]
 *           description: Tipo do quarto
 *         status:
 *           type: string
 *           enum: [disponível, ocupado]
 *           description: Status do quarto
 *       example:
 *         id: 1
 *         numero: 101
 *         tipo: solteiro
 *         status: disponível
 *     
 *     Reserva:
 *       type: object
 *       required:
 *         - idHospede
 *         - idQuarto
 *         - dataCheckin
 *         - dataCheckout
 *       properties:
 *         idReserva:
 *           type: integer
 *           description: ID único da reserva
 *         idHospede:
 *           type: integer
 *           description: ID do hóspede
 *         idQuarto:
 *           type: integer
 *           description: ID do quarto
 *         dataCheckin:
 *           type: string
 *           format: date
 *           description: Data de check-in
 *         dataCheckout:
 *           type: string
 *           format: date
 *           description: Data de check-out
 *         status:
 *           type: string
 *           enum: [ativa, cancelada]
 *           description: Status da reserva
 *       example:
 *         idReserva: 1
 *         idHospede: 1
 *         idQuarto: 1
 *         dataCheckin: "2023-12-01"
 *         dataCheckout: "2023-12-05"
 *         status: ativa
 */

// ====== ROTAS DE HÓSPEDES ======

/**
 * @swagger
 * /hospedes:
 *   post:
 *     summary: Registra um novo hóspede
 *     tags: [Hóspedes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - telefone
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hóspede registrado com sucesso
 *       400:
 *         description: Erro de validação
 */
app.post('/hospedes', hospedeController.registrarHospede);

/**
 * @swagger
 * /hospedes/login:
 *   post:
 *     summary: Realiza login do hóspede
 *     tags: [Hóspedes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Email ou senha inválidos
 */
app.post('/hospedes/login', hospedeController.loginHospede);

/**
 * @swagger
 * /hospedes:
 *   get:
 *     summary: Lista todos os hóspedes
 *     tags: [Hóspedes]
 *     responses:
 *       200:
 *         description: Lista de hóspedes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hospede'
 */
app.get('/hospedes', hospedeController.listarTodosHospedes);

/**
 * @swagger
 * /hospedes/{id}:
 *   get:
 *     summary: Consulta hóspede por ID
 *     tags: [Hóspedes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do hóspede
 *     responses:
 *       200:
 *         description: Hóspede encontrado
 *       404:
 *         description: Hóspede não encontrado
 */
app.get('/hospedes/:id', hospedeController.consultarHospedePorId);

// ====== ROTAS DE QUARTOS ======

/**
 * @swagger
 * /quartos:
 *   get:
 *     summary: Lista todos os quartos
 *     tags: [Quartos]
 *     responses:
 *       200:
 *         description: Lista de quartos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Quarto'
 */
app.get('/quartos', quartoController.listarTodosQuartos);

/**
 * @swagger
 * /quartos/tipo/{tipo}:
 *   get:
 *     summary: Consulta quartos por tipo
 *     tags: [Quartos]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [solteiro, casal, suíte]
 *         required: true
 *         description: Tipo do quarto
 *     responses:
 *       200:
 *         description: Lista de quartos do tipo especificado
 *       400:
 *         description: Tipo inválido
 */
app.get('/quartos/tipo/:tipo', quartoController.consultarQuartosPorTipo);

/**
 * @swagger
 * /quartos/status/{status}:
 *   get:
 *     summary: Consulta quartos por status
 *     tags: [Quartos]
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           enum: [disponível, ocupado]
 *         required: true
 *         description: Status do quarto
 *     responses:
 *       200:
 *         description: Lista de quartos com o status especificado
 *       400:
 *         description: Status inválido
 */
app.get('/quartos/status/:status', quartoController.consultarQuartosPorStatus);

/**
 * @swagger
 * /quartos/{id}:
 *   get:
 *     summary: Consulta quarto por ID
 *     tags: [Quartos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do quarto
 *     responses:
 *       200:
 *         description: Quarto encontrado
 *       404:
 *         description: Quarto não encontrado
 */
app.get('/quartos/:id', quartoController.consultarQuartoPorId);

// ====== ROTAS DE RESERVAS ======

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Cria uma nova reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idHospede
 *               - idQuarto
 *               - dataCheckin
 *               - dataCheckout
 *             properties:
 *               idHospede:
 *                 type: integer
 *               idQuarto:
 *                 type: integer
 *               dataCheckin:
 *                 type: string
 *                 format: date
 *               dataCheckout:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Token inválido ou expirado
 */
app.post('/reservas', authenticateToken, reservaController.criarReserva);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Lista todas as reservas
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reserva'
 */
app.get('/reservas', authenticateToken, reservaController.listarTodasReservas);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Consulta reserva por ID
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva não encontrada
 */
app.get('/reservas/:id', authenticateToken, reservaController.consultarReservaPorId);

/**
 * @swagger
 * /reservas/{id}/cancelar:
 *   delete:
 *     summary: Cancela uma reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva cancelada com sucesso
 *       400:
 *         description: Erro ao cancelar reserva
 *       404:
 *         description: Reserva não encontrada
 */
app.delete('/reservas/:id/cancelar', authenticateToken, reservaController.cancelarReserva);

/**
 * @swagger
 * /hospedes/{idHospede}/reservas:
 *   get:
 *     summary: Lista reservas de um hóspede
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idHospede
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do hóspede
 *     responses:
 *       200:
 *         description: Lista de reservas do hóspede
 */
app.get('/hospedes/:idHospede/reservas', authenticateToken, reservaController.listarReservasPorHospede);

module.exports = app;
