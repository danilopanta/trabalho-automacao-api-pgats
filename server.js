const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📖 Documentação disponível em: http://localhost:${PORT}/api-docs`);
    console.log(`🌐 API disponível em: http://localhost:${PORT}`);
});
