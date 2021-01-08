import React, {useEffect, useState} from 'react';
import {Text, View, Button} from 'react-native';
import styles from '../shared/styles';
import {SignInButton, LogoutButton, CheckUserButton} from './GoogleButtons';
import {
  useToggleAddingTheft,
  useAddingTheft,
} from '../shared/AddingTheftContext';
import {
  useIsUserLoggedIn,
  useToggleIsUserLoggedIn,
} from '../shared/IsUserLoggedInContext';
import {isSignedInToGoogle} from './GoogleButtons';

const CustomDrawerContent = ({navigation}) => {
  const setIsAddingNewTheft = useToggleAddingTheft();
  const isAddingNewTheft = useAddingTheft();
  const isUserLoggedIn = useIsUserLoggedIn();
  const setIsUserLoggedIn = useToggleIsUserLoggedIn();

  useEffect(() => {
    isSignedInToGoogle().then((res) => {
      if (res === !isUserLoggedIn) {
        setIsUserLoggedIn();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);

  function isAddingNewTheftController() {
    navigation.toggleDrawer();
    // add setState(old=>!old)
    !isAddingNewTheft && setIsAddingNewTheft();
  }

  return (
    <View style={styles.drawerContainer}>
      {isUserLoggedIn ? (
        <>
          <Text>your name</Text>
          <LogoutButton />
          <Button title={'add new'} onPress={isAddingNewTheftController} />
        </>
      ) : (
        <SignInButton />
      )}
      <CheckUserButton isUserLoggedIn={isUserLoggedIn} />
    </View>
  );
};

export default CustomDrawerContent;
