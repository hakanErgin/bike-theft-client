import React from 'react';
import {View, StyleSheet} from 'react-native';
import MenuIcon from 'react-native-vector-icons/Entypo';
import commonStyles from '../../../Utils/commonStyles';

export default function MenuButton({navigation, isAddingNewTheft}) {
  return (
    <View style={styles.menuBtnContainer}>
      <MenuIcon
        name="menu"
        style={[styles.menuIcon, isAddingNewTheft && styles.disabled]}
        onPress={() => !isAddingNewTheft && navigation.toggleDrawer()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuBtnContainer: {
    position: 'absolute',
    top: commonStyles.gap[3],
    left: commonStyles.gap[3],
    backgroundColor: commonStyles.containerBackgroundColor.light,
    borderRadius: commonStyles.borderRadius.small,
    elevation: 1,
  },
  menuIcon: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  disabled: {
    color: commonStyles.iconColor.lightGrey,
  },
});
