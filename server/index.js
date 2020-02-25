const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');

let pokeObj;
let pokemonFound;
  // pokemons(first: Int!): [Pokemon],
  // pokemon(id: String, name: String): Pokemon

const typeDefs = gql`


type Pokemon{
  id: String,
  name: String,
  classifications: String,
  types: [String],
  resistant: [String],
  weaknesses: [String],
  weight: [String],
  height: [String],
  fleeRate: Int,
  evolutionRequirements: [String],
  evolutions: [Int],
  maxCP: Int,
  MaxHP: Int,
  Attacks: [Int]
}

type Query {
  pikachu: Pokemon,
}

`;
fs.readFile('database/pokemon.json', 'utf8', (err, data) => {

  if (err) throw err;
  pokeObj = JSON.parse(data);
  for(const key in pokeObj){
    if(pokeObj[key].id === "025"){
      pokemonFound = pokeObj[key];
    }
  }
  console.log( pokemonFound)
});

const resolvers = {
  Query: {
    pikachu: () => pokemonFound

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
