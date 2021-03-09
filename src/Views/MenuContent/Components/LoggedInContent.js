import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useToggleIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import {LogoutButton} from '../../../Utils/GoogleSignin';
import {UsersReportedThefts} from './UsersReportsList';
import commonStyles from '../../../Utils/commonStyles';
import {
  LoadingView,
  NormalText,
  BoldText,
} from '../../../Utils/commonComponents';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../../ContextProviders/UserContext';

export default function LoggedInContent({navigation}) {
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  function toggleIsAddingNewTheft() {
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
            size={commonStyles.iconSize.larger}
          />
        </View>
        <UsersReportedThefts currentUser={currentUser} />
        <TouchableOpacity
          onPress={toggleIsAddingNewTheft}
          style={styles.reportButton}>
          <BoldText style={styles.reportButtonText}>Report a theft</BoldText>
        </TouchableOpacity>
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
    fontSize: commonStyles.fontSize.xl,
  },
  nameAndLogoutBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  reportButton: {
    margin: commonStyles.gap[5],
    padding: commonStyles.gap[2],
    backgroundColor: commonStyles.containerBackgroundColor.light,
    borderRadius: commonStyles.borderRadius.large,
    borderColor: commonStyles.iconColor.darkRed,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 3,
  },
  reportButtonText: {
    color: commonStyles.iconColor.darkRed,
    fontSize: commonStyles.fontSize.large,
  },
});
