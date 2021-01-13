import React, {useState} from 'react';
import MapScreen from './Screens/MapContent/MapScreen';
import DrawerContent from './Screens/MenuContent/CustomDrawerContent';
import CombinedProviders from './ContextProviders/CombinedProviders';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <CombinedProviders>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Map" drawerContent={DrawerContent}>
          <Drawer.Screen name="Map" component={MapScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </CombinedProviders>
  );
};

export default App;
