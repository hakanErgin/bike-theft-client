import React from 'react';
import MapScreen from './screens/MapScreen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawerContent from './components/CustomDrawerContent';
import {AddingTheftProvider} from './shared/AddingTheftContext';
import {IsUserLoggedInProvider} from './shared/IsUserLoggedInContext';

const Drawer = createDrawerNavigator();

const client = new ApolloClient({
  uri: 'http://192.168.1.2:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <IsUserLoggedInProvider>
        <AddingTheftProvider>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Map"
              drawerContent={(props) => {
                return (
                  <DrawerContentScrollView {...props}>
                    <CustomDrawerContent {...props} />
                  </DrawerContentScrollView>
                );
              }}>
              <Drawer.Screen name="Map" component={MapScreen} />
            </Drawer.Navigator>
          </NavigationContainer>
        </AddingTheftProvider>
      </IsUserLoggedInProvider>
    </ApolloProvider>
  );
};

export default App;
