"use client";
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000', // Replace with your GraphQL API endpoint
});
const authLink = setContext((_, { headers }) => {
  const data = JSON.parse(localStorage.getItem('data') as string);
  let token = data?.loginCandidate?.token || data?.loginCompany?.token || ""
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
