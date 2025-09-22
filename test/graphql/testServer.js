const { ApolloServer } = require('@apollo/server');
const typeDefs = require('../../graphql/schema');
const resolvers = require('../../graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

module.exports = server;
