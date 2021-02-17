import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useToggleIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import {LogoutButton} from './GoogleButtons';
import {UsersReportedThefts} from './UsersReportsList';
import commonStyles from '../../../Utils/commonStyles';

export default function LoggedInContent({navigation}) {
  const [currentUser, setCurrentUser] = useState();
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  // if logged in, make sure token and all is up to date
  useEffect(() => {
    async function refreshUserInfo() {
      return await GoogleSignin.signInSilently();
    }
    refreshUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => console.log('refreshUserInfo' + err));
  }, []);

  function isAddingNewTheftController() {
    navigation.toggleDrawer();
    setIsAddingNewTheft((val) => !val);
  }

  return (
    <View style={styles.loggedInContent}>
      {currentUser && (
        <Text style={styles.username}>{currentUser.user.name}</Text>
      )}
      {currentUser && <UsersReportedThefts currentUser={currentUser} />}
      <View style={styles.btnContainer}>
        <Button title={'REPORT THEFT'} onPress={isAddingNewTheftController} />
        <LogoutButton
          setIsAddingNewTheft={setIsAddingNewTheft}
          color={commonStyles.iconColor.darkRed}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loggedInContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  username: {
    flex: 0.1,
    fontSize: commonStyles.fontSize.large,
  },
  btnContainer: {
    flex: 0.25,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
});
