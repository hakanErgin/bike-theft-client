import React from 'react';
import {View, StyleSheet} from 'react-native';
import MenuIcon from 'react-native-vector-icons/Entypo';
import commonStyles from '../../../Utils/commonStyles';

export default function MenuButton({navigation}) {
  return (
    <View style={styles.menuBtnContainer}>
      <MenuIcon
        name="menu"
        size={commonStyles.iconSize.xl}
        color={commonStyles.iconColor.darkRed}
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuBtnContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
