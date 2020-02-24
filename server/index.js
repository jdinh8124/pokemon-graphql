const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String,
    name: String
  },

  type Attack {
  # The name of this Pokémon attack
  name: String

  # The type of this Pokémon attack
  type: String

  # The damage of this Pokémon attack
  damage: Int
}

`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    name: () => 'James'

  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
