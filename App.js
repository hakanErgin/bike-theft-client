import React from 'react';
import MapScreen from './screens/MapScreen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const client = new ApolloClient({
  uri: 'http://192.168.1.2:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Map"
          drawerContent={(props) => {
            return (
              <DrawerContentScrollView {...props}>
                {/* <DrawerItemList {...props} /> */}
                <CustomDrawerContent />
              </DrawerContentScrollView>
            );
          }}>
          <Drawer.Screen name="Map" component={MapScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
