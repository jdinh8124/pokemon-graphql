import React from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

const Pokemon = gql`
  query Pokemon{
    id
  }
  `



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <ApolloProvider client={client}>
      <div>
        <h1>Pokemon Information</h1>
        <Query query={Pokemon}>

        </Query>
      </div>
      </ApolloProvider>
    );
  }

}
