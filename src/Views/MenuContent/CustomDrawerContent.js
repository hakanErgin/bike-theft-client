import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  SignInButton,
  // CheckUserButton,
  isSignedInToGoogle,
} from '../../Utils/GoogleSignin';
import {
  useIsUserLoggedIn,
  useToggleIsUserLoggedIn,
} from '../../ContextProviders/IsUserLoggedInContext';
// import {DrawerContentScrollView} from '@react-navigation/drawer';
import LoggedInContent from './Components/LoggedInContent';
import commonStyles from '../../Utils/commonStyles';

function LoggedOutContent() {
  return (
    <View style={styles.loggedOutContent}>
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
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() => navigation.navigate({name: 'Feedback'})}>
        <Text>Feedback</Text>
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
  },
  feedbackButton: {alignSelf: 'center'},
});
