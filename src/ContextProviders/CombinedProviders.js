import React from 'react';
import {GRAPHQL_URI} from '@env';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import {IsAddingNewTheftProvider} from './IsAddingNewTheftContext';
import {IsUserLoggedInProvider} from './IsUserLoggedInContext';
import {SelectedTheftIdProvider} from './SelectedTheftIdContext';
import {IsViewModalVisibleProvider} from './IsViewModalVisibleContext';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const CombinedProviders = ({children}) => {
  return (
    <ApolloProvider client={client}>
      <IsUserLoggedInProvider>
        <SelectedTheftIdProvider>
          <IsViewModalVisibleProvider>
            <IsAddingNewTheftProvider>{children}</IsAddingNewTheftProvider>
          </IsViewModalVisibleProvider>
        </SelectedTheftIdProvider>
      </IsUserLoggedInProvider>
    </ApolloProvider>
  );
};

export default CombinedProviders;
