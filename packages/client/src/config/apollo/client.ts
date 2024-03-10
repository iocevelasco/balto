import { ApolloClient, InMemoryCache } from '@apollo/client';
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/api',
  cache: new InMemoryCache(),
})

const query = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
      }
    }
  }
`

client
  .query({query})
  .then((result) => console.log(result));

export { client }
