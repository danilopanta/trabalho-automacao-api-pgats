const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const express = require('express');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function createApolloServer() {
  // Criar servidor Apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error.message);
      return {
        message: error.message,
        path: error.path,
        extensions: {
          code: error.extensions?.code,
        }
      };
    }
  });

  // Para testes, vamos usar o modo standalone
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      // Extrair token do header Authorization
      const token = req.headers.authorization?.replace('Bearer ', '') || null;
      
      return {
        token,
        req
      };
    },
  });

  return { server, url };
}

module.exports = createApolloServer;
