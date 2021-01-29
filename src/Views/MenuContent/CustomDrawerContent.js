import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  SignInButton,
  // CheckUserButton,
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
  return (
    <View style={styles.drawerContainer}>
      <Text>Pls sign in to do stuff</Text>
      <SignInButton />
    </View>
  );
}

const CustomDrawerContent = ({navigation}) => {
  const isUserLoggedIn = useIsUserLoggedIn();
  const setIsUserLoggedIn = useToggleIsUserLoggedIn();
  // decide what to show in drawer
  useEffect(() => {
    isSignedInToGoogle().then((res) => {
      if (res === !isUserLoggedIn) {
        console.log({res});
        setIsUserLoggedIn(res);
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
      {/* <CheckUserButton /> */}
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContainer: {padding: 10},
});
