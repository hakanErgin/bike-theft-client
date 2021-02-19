import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useToggleIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import {LogoutButton} from '../../../Utils/GoogleSignin';
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
  if (currentUser) {
    return (
      <View style={styles.loggedInContentContainer}>
        <View style={styles.nameAndLogoutBtnContainer}>
          <Text style={styles.username}>{currentUser.user.name}</Text>
          <LogoutButton
            setIsAddingNewTheft={setIsAddingNewTheft}
            color={commonStyles.iconColor.darkRed}
            size={commonStyles.iconSize.large}
          />
        </View>
        <UsersReportedThefts currentUser={currentUser} />
        <View style={styles.btnContainer}>
          <Button title={'REPORT THEFT'} onPress={isAddingNewTheftController} />
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  loggedInContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  username: {
    fontSize: commonStyles.fontSize.large,
  },
  btnContainer: {
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  nameAndLogoutBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
