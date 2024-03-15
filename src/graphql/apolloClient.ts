import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const API_URL = 'https://squid.subsquid.io/subsocial/graphql'
export const theClient = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
  });