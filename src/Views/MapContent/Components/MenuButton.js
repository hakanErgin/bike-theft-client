import React from 'react';
import {View, StyleSheet} from 'react-native';
import MenuIcon from 'react-native-vector-icons/Entypo';

export default function MenuButton({navigation}) {
  const iconSize = 42;
  const iconColor = '#900';

  return (
    <View style={styles.menuBtnContainer}>
      <MenuIcon
        name="menu"
        size={iconSize}
        color={iconColor}
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
