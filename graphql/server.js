const createApolloServer = require('./app');

const PORT = process.env.GRAPHQL_PORT || 4000;

async function startServer() {
  try {
    const { server, url } = await createApolloServer();
    
    console.log(`🚀 Servidor GraphQL rodando em: ${url}`);
    console.log(`📖 GraphQL Playground disponível em: ${url}`);
    console.log(`🌐 GraphQL endpoint: ${url}`);
    
    return { server, url };
  } catch (error) {
    console.error('Erro ao iniciar servidor GraphQL:', error);
    process.exit(1);
  }
}

// Iniciar servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
  startServer();
}

module.exports = startServer;
