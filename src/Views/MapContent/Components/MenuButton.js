import React from 'react';
import {View, StyleSheet} from 'react-native';
import MenuIcon from 'react-native-vector-icons/Entypo';
import commonStyles from '../../../Utils/commonStyles';

export default function MenuButton({navigation}) {
  return (
    <View style={styles.menuBtnContainer}>
      <MenuIcon
        name="menu"
        style={styles.menuIcon}
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuBtnContainer: {
    position: 'absolute',
    top: commonStyles.gap[2],
    left: commonStyles.gap[2],
    backgroundColor: commonStyles.containerBackgroundColor.light,
    borderRadius: commonStyles.borderRadius.small,
  },
  menuIcon: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
});
