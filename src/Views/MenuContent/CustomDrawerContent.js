import React, {useEffect} from 'react';
import {Text, View, Button, ScrollView} from 'react-native';
import styles from './menuStyles';
import {
  SignInButton,
  CheckUserButton,
  isSignedInToGoogle,
} from './Components/GoogleButtons';
import {
  useIsUserLoggedIn,
  useToggleIsUserLoggedIn,
} from '../../ContextProviders/IsUserLoggedInContext';
// import {DrawerContentScrollView} from '@react-navigation/drawer';
import LoggedInContent from './Components/LoggedInContent';

function DrawerContent(props) {
  return (
    // <DrawerContentScrollView {...props}>
    <CustomDrawerContent {...props} />
    // </DrawerContentScrollView>
  );
}

function LoggedOutContent() {
  return <SignInButton />;
}

const CustomDrawerContent = ({navigation}) => {
  const isUserLoggedIn = useIsUserLoggedIn();
  const setIsUserLoggedIn = useToggleIsUserLoggedIn();
  // decide what to show in drawer
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
      <CheckUserButton />
    </View>
  );
};

export default DrawerContent;
