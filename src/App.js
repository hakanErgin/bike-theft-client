import React from 'react';
import MapScreen from './Views/MapContent/MapScreen';
import CustomDrawerContent from './Views/MenuContent/CustomDrawerContent';
import CombinedProviders from './ContextProviders/CombinedProviders';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import FeedbackModal from './Views/ModalContent/FeedbackModal';

const Drawer = createDrawerNavigator();

const App = () => {
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
          <Drawer.Screen name="Feedback" component={FeedbackModal} />
        </Drawer.Navigator>
      </NavigationContainer>
    </CombinedProviders>
  );
};

export default App;
