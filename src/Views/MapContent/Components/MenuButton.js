import React from 'react';
import {View, StyleSheet} from 'react-native';
import MenuIcon from 'react-native-vector-icons/Entypo';
import commonStyles from '../../../Utils/commonStyles';

export default function MenuButton({navigation}) {
  return (
    <MenuIcon
      name="menu"
      style={styles.menuIcon}
      onPress={() => navigation.toggleDrawer()}
    />
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
});
