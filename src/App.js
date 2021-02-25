import React, {useEffect} from 'react';
import MapScreen from './Views/MapContent/MapScreen';
import CustomDrawerContent from './Views/MenuContent/CustomDrawerContent';
import CombinedProviders from './ContextProviders/CombinedProviders';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import FeedbackForm from './Views/FeedbackForm';
import {configureGoogleSignin} from './Utils/GoogleSignin';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    configureGoogleSignin();
  }, []);

  function MapContent(props) {
    return <MapScreen {...props} />;
  }
  function DrawerContent(props) {
    return <CustomDrawerContent {...props} />;
  }

  return (
    <CombinedProviders>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Map"
          drawerContent={DrawerContent}
          gestureHandlerProps={{enabled: false}}>
          <Drawer.Screen name="Map" component={MapContent} />
          <Drawer.Screen
            name="Feedback"
            component={FeedbackForm}
            options={{unmountOnBlur: true}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </CombinedProviders>
  );
};

export default App;
