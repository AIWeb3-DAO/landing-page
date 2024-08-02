import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://squid.subsquid.io/subsocial/graphql'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})