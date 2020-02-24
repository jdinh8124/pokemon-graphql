const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');

let pokeObj;
let pokemonFound;
  // pokemons(first: Int!): [Pokemon],
  // pokemon(id: String, name: String): Pokemon

const typeDefs = gql`
type Query {
  pokemon: String,
  pokemons: String,
  pikachu: [pokemon],
}

`;
fs.readFile('database/pokemon.json', 'utf8', (err, data) => {

  if (err) throw err;
  pokeObj = data;
  pokemondFound = pokeObj[0].find(pokemon => { pokemon.id === 25 })
});

const resolvers = {
  Query: {
    pokemon: () => 'Go Pikachu!',
    pokemons: () => 'James',
    pikachu: () => pokemonFound,

  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
