import React from 'react';
import {GRAPHQL_REMOTE_URI, MEDIA_REMOTE_URI} from '@env';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';

import {IsAddingNewTheftProvider} from './IsAddingNewTheftContext';
import {IsUserLoggedInProvider} from './IsUserLoggedInContext';
import {SelectedTheftIdProvider} from './SelectedTheftIdContext';
import {IsViewModalVisibleProvider} from './IsViewModalVisibleContext';
import {CurrentUserProvider} from './UserContext';

const client = new ApolloClient({
  uri: GRAPHQL_REMOTE_URI,
  cache: new InMemoryCache({
    // this makes sure usersreports are in sync when delete
    typePolicies: {
      Query: {
        fields: {
          getUsersReportedThefts: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Theft: {
        fields: {
          bike: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          date_time: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
export const mediaClient = new ApolloClient({
  link: createUploadLink({
    uri: MEDIA_REMOTE_URI,
  }),
  cache: new InMemoryCache(),
});

const CombinedProviders = ({children}) => {
  return (
    <ApolloProvider client={client}>
      <CurrentUserProvider>
        <IsUserLoggedInProvider>
          <SelectedTheftIdProvider>
            <IsViewModalVisibleProvider>
              <IsAddingNewTheftProvider>{children}</IsAddingNewTheftProvider>
            </IsViewModalVisibleProvider>
          </SelectedTheftIdProvider>
        </IsUserLoggedInProvider>
      </CurrentUserProvider>
    </ApolloProvider>
  );
};

export default CombinedProviders;
