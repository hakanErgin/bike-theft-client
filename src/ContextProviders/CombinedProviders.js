import React from 'react';
import {GRAPHQL_URI} from '@env';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import {IsAddingNewTheftProvider} from './IsAddingNewTheftContext';
import {IsUserLoggedInProvider} from './IsUserLoggedInContext';
import {IsModalVisibleProvider} from './IsModalVisibleContext';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const CombinedProviders = ({children}) => {
  return (
    <ApolloProvider client={client}>
      <IsUserLoggedInProvider>
        <IsModalVisibleProvider>
          <IsAddingNewTheftProvider>{children}</IsAddingNewTheftProvider>
        </IsModalVisibleProvider>
      </IsUserLoggedInProvider>
    </ApolloProvider>
  );
};

export default CombinedProviders;
