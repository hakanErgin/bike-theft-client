import React, {useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import styles from '../../styles';
import {
  SignInButton,
  LogoutButton,
  // CheckUserButton,
  isSignedInToGoogle,
} from './Components/GoogleButtons';
import {useToggleIsAddingNewTheft} from '../../ContextProviders/IsAddingNewTheftContext';
import {
  useIsUserLoggedIn,
  useToggleIsUserLoggedIn,
} from '../../ContextProviders/IsUserLoggedInContext';
// import {DrawerContentScrollView} from '@react-navigation/drawer';

function DrawerContent(props) {
  return (
    // <DrawerContentScrollView {...props}>
    <CustomDrawerContent {...props} />
    // </DrawerContentScrollView>
  );
}

function LoggedInContent({navigation}) {
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  function isAddingNewTheftController() {
    navigation.toggleDrawer();
    setIsAddingNewTheft();
  }

  return (
    <View>
      <LogoutButton />
      <Button title={'add new'} onPress={isAddingNewTheftController} />
    </View>
  );
}
function LoggedOutContent() {
  return <SignInButton />;
}

const CustomDrawerContent = ({navigation}) => {
  const isUserLoggedIn = useIsUserLoggedIn();
  const setIsUserLoggedIn = useToggleIsUserLoggedIn();

  useEffect(() => {
    isSignedInToGoogle().then((res) => {
      if (res === !isUserLoggedIn) {
        setIsUserLoggedIn();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);

  return (
    <View style={styles.drawerContainer}>
      <Text>Welcome</Text>
      {isUserLoggedIn ? (
        <LoggedInContent navigation={navigation} />
      ) : (
        <LoggedOutContent />
      )}
      {/* <CheckUserButton isUserLoggedIn={isUserLoggedIn} /> */}
    </View>
  );
};

export default DrawerContent;