const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');

const app = express();


let pokeObj;
let pokemonFound;
  // pokemons(first: Int!): [Pokemon],
  // pokemon(id: String, name: String): Pokemon

const typeDefs = gql`



type Query {
  query: Query
  pokemons(first: Int!): [Pokemon]
  pokemon(id: String, name: String): Pokemon
}

type Pokemon{
  id: String,
  name: String,
  classifications: String,
  types: [String],
  resistant: [String],
  weaknesses: [String],
  weight: [String],
  height: [String],
  fleeRate: Float,
  evolutionRequirements: [String],
  evolutions: [Int],
  maxCP: Int,
  MaxHP: Int,
  attacks: PokemonAttack
}

type Attack {
  # The name of this Pokémon attack
  name: String

  # The type of this Pokémon attack
  type: String

  # The damage of this Pokémon attack
  damage: Int
}
# Represents a Pokémon's attack types
type PokemonAttack {
  # The fast attacks of this Pokémon
  fast: [Attack]

  # The special attacks of this Pokémon
  special: [Attack]
}

# Represents a Pokémon's dimensions
type PokemonDimension {
  # The minimum value of this dimension
  minimum: String

  # The maximum value of this dimension
  maximum: String
}

# Represents a Pokémon's requirement to evolve
type PokemonEvolutionRequirement {
  # The amount of candy to evolve
  amount: Int

  # The name of the candy to evolve
  name: String
}

`;


const resolvers = {
  Query: {
    pokemon: () => pokemonFound

  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.get('/graphql', (req, res) => {
  const graphqlQuery = req.query.graphqlQuery;
  if (!graphqlQuery) {
    return res.status(500).send('You must provide a query');
  }

  fs.readFile('database/pokemon.json', 'utf8', (err, data) => {

    if (err) throw err;
    pokeObj = JSON.parse(data);
    for (const key in pokeObj) {
      if (pokeObj[key].id === "025") {
        pokemonFound = pokeObj[key];
      }
    }
    console.log(pokemonFound)
  });

  return graphql(rootSchema, graphqlQuery)
    .then(response => response.data)
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
