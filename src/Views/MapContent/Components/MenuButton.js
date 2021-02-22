import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MenuIcon from 'react-native-vector-icons/Entypo';
import commonStyles from '../../../Utils/commonStyles';

export default function MenuButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={styles.menuIconContainer}>
      <MenuIcon name="menu" style={styles.menuIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuIconContainer: {
    backgroundColor: commonStyles.containerBackgroundColor.light,
    borderRadius: commonStyles.borderRadius.normal,
    marginVertical: 4,
  },
  menuIcon: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
});
