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
import commonStyles from '../../Utils/commonStyles';

// this needs to be a function
function DrawerContent(props) {
  return (
    // <DrawerContentScrollView {...props}>
    <CustomDrawerContent {...props} />
    // </DrawerContentScrollView>
  );
}

function LoggedOutContent() {
  return (
    <View>
      <Text>Sign in to report a bike theft!</Text>
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
        setIsUserLoggedIn(res);
      }
    });
  }, [isUserLoggedIn, setIsUserLoggedIn]);

  return (
    <View style={styles.drawerContainer}>
      <Text>Welcome,</Text>
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
  drawerContainer: {
    padding: commonStyles.gap[4],
    flex: 1,
  },
});
