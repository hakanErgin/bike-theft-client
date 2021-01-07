import React from 'react';
import {Text, View, Button} from 'react-native';
import styles from '../shared/styles';
import {SignInButton, LogoutButton, CheckUserButton} from './GoogleButtons';
import {useToggleAddingTheft} from '../shared/AddingTheftContext';

const CustomDrawerContent = ({navigation}) => {
  const setIsAddingNewTheft = useToggleAddingTheft();

  function isAddingNewTheftController() {
    navigation.toggleDrawer();
    // add setState(old=>!old)
    setIsAddingNewTheft();
  }

  return (
    <View style={styles.drawerContainer}>
      <Text>your name</Text>
      <SignInButton />
      <LogoutButton />
      <CheckUserButton />
      <Button title={'add new'} onPress={isAddingNewTheftController} />
    </View>
  );
};

export default CustomDrawerContent;
