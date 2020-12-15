import React from 'react';
import Map from './components/map/Map';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.1.2:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Map />
    </ApolloProvider>
  );
};

export default App;
