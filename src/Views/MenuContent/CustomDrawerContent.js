import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  SignInButton,
  isSignedInToGoogle,
  signUserInSilently,
  signUserOut,
} from '../../Utils/GoogleSignin';
import {
  useIsUserLoggedIn,
  useToggleIsUserLoggedIn,
} from '../../ContextProviders/IsUserLoggedInContext';
// import {DrawerContentScrollView} from '@react-navigation/drawer';
import LoggedInContent from './Components/LoggedInContent';
import commonStyles from '../../Utils/commonStyles';
import {
  useSetCurrentUser,
  useCurrentUser,
} from '../../ContextProviders/UserContext';

function LoggedOutContent() {
  return (
    <View style={styles.loggedOutContent}>
      <View>
        <Text>You can sign in to report a bike theft,</Text>
        <Text>or close this menu and view reported bike thefts on the map</Text>
        <Text>More to come..</Text>
      </View>
      <SignInButton />
    </View>
  );
}
// this is an entry point to the app
const CustomDrawerContent = ({navigation}) => {
  const setCurrentUser = useSetCurrentUser();
  const currentUser = useCurrentUser();

  const isUserLoggedIn = useIsUserLoggedIn();
  const setIsUserLoggedIn = useToggleIsUserLoggedIn();
  // decide what to show in drawer
  useEffect(() => {
    isSignedInToGoogle().then((isSignedIn) => {
      if (isSignedIn === true) {
        signUserInSilently()
          .then((userData) => {
            setCurrentUser(userData);
            setIsUserLoggedIn(isSignedIn);
          })
          .catch((err) => {
            console.log('signinsilent err ' + err);
            signUserOut().then(() => {
              setIsUserLoggedIn(false);
              navigation.openDrawer();
            });
          });
      } else if (isSignedIn === false) {
        setIsUserLoggedIn(isSignedIn);
        navigation.openDrawer();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn, setIsUserLoggedIn]);

  return (
    <View style={styles.drawerContainer}>
      <Text>Welcome</Text>
      {isUserLoggedIn && currentUser ? (
        <LoggedInContent navigation={navigation} />
      ) : (
        <LoggedOutContent />
      )}
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() => navigation.navigate({name: 'Feedback'})}>
        <Text>Give feedback!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContainer: {
    padding: commonStyles.gap[4],
    flex: 1,
  },
  loggedOutContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  feedbackButton: {alignSelf: 'center'},
});
