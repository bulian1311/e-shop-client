import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';

const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const domain = process.env.SHOPIFY_STORE_DOMAIN;

let graphQLClient: GraphQLClient;

function createClient(initialState: any) {
  return new GraphQLClient({
    ssrMode: typeof window === 'undefined',
    url: `https://${domain}/api/2022-01/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontToken || '',
      'Content-Type': 'application/graphql',
    },
    cache: memCache({ initialState }),
  });
}

export function initializeGraphQL(initialState = null) {
  const _graphQLClient = graphQLClient ?? createClient(initialState);

  if (initialState && graphQLClient) {
    graphQLClient.cache = memCache({
      initialState: Object.assign(
        graphQLClient.cache.getInitialState(),
        initialState
      ),
    });
  }

  // For SSG and SSR always create a new GraphQL Client
  if (typeof window === 'undefined') return _graphQLClient;

  // Create the GraphQL Client once in the client
  if (!graphQLClient) graphQLClient = _graphQLClient;

  return _graphQLClient;
}
