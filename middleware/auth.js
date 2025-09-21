const jwt = require('jsonwebtoken');

// Chave secreta para JWT (em produção, deve estar em variável de ambiente)
const JWT_SECRET = 'hotel_reservas_secret_key_2023';

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token de acesso requerido'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Token inválido ou expirado'
            });
        }

        req.user = user;
        next();
    });
};

// Função para gerar token
const generateToken = (hospede) => {
    const payload = {
        id: hospede.id,
        email: hospede.email,
        nome: hospede.nome
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

// Função para verificar token (sem middleware)
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    authenticateToken,
    generateToken,
    verifyToken,
    JWT_SECRET
};
