import { useMemo } from 'react';
import { initializeGraphQL } from '../graphql';

export function useGraphQLClient(initialState: any) {
  const store = useMemo(() => initializeGraphQL(initialState), [initialState]);

  return store;
}
