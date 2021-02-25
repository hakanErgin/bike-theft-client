import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {useToggleIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import {LogoutButton} from '../../../Utils/GoogleSignin';
import {UsersReportedThefts} from './UsersReportsList';
import commonStyles from '../../../Utils/commonStyles';
import {LoadingView} from '../../../Utils/commonComponents';

export default function LoggedInContent({navigation, userData}) {
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  function isAddingNewTheftController() {
    navigation.toggleDrawer();
    setIsAddingNewTheft((val) => !val);
  }
  if (userData) {
    return (
      <View style={styles.loggedInContentContainer}>
        <View style={styles.nameAndLogoutBtnContainer}>
          <Text style={styles.username}>{userData.user.name}</Text>
          <LogoutButton
            setIsAddingNewTheft={setIsAddingNewTheft}
            color={commonStyles.iconColor.darkRed}
            size={commonStyles.iconSize.large}
          />
        </View>
        <UsersReportedThefts currentUser={userData} />
        <View style={styles.btnContainer}>
          <Button title={'REPORT THEFT'} onPress={isAddingNewTheftController} />
        </View>
      </View>
    );
  } else {
    return <LoadingView />;
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
    marginVertical: commonStyles.gap[1],
    paddingHorizontal: commonStyles.gap[4],
  },
  nameAndLogoutBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
