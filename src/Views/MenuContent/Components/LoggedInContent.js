import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {useToggleIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import {LogoutButton, signUserInSilently} from '../../../Utils/GoogleSignin';
import {UsersReportedThefts} from './UsersReportsList';
import commonStyles from '../../../Utils/commonStyles';

export default function LoggedInContent({navigation}) {
  const [currentUser, setCurrentUser] = useState();
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  useEffect(() => {
    signUserInSilently()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log('signUserInSilently' + err));
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
