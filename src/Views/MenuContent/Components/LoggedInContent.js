import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useToggleIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import {LogoutButton} from '../../../Utils/GoogleSignin';
import {UsersReportedThefts} from './UsersReportsList';
import commonStyles from '../../../Utils/commonStyles';
import {LoadingView, NormalText} from '../../../Utils/commonComponents';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../../ContextProviders/UserContext';

export default function LoggedInContent({navigation}) {
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  function isAddingNewTheftController() {
    navigation.toggleDrawer();
    setIsAddingNewTheft((val) => !val);
  }
  if (currentUser) {
    return (
      <View style={styles.loggedInContentContainer}>
        <View style={styles.nameAndLogoutBtnContainer}>
          <NormalText style={styles.username}>
            {currentUser.user.name}
          </NormalText>
          <LogoutButton
            setIsAddingNewTheft={setIsAddingNewTheft}
            setCurrentUser={setCurrentUser}
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
    marginVertical: commonStyles.gap[4],
    paddingHorizontal: commonStyles.gap[4],
  },
  nameAndLogoutBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
