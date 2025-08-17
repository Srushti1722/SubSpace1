import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient as createWSClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { nhost } from '../auth/NhostProvider';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_GRAPHQL_URL,
  headers: async () => {
    const token = (await nhost.auth.getAccessToken()) || undefined;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
} as any);

const wsLink = new GraphQLWsLink(createWSClient({
  url: import.meta.env.VITE_HASURA_WS_URL,
  connectionParams: async () => {
    const token = await nhost.auth.getAccessToken();
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  }
}));

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
