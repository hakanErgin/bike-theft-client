import React from 'react';
import {View, Button} from 'react-native';
import styles from '../../../styles';

export default function MenuButton({navigation}) {
  return (
    <View style={styles.menuBtnContainer}>
      <Button title={'menu'} onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}
