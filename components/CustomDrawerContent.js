import React from 'react';
import {Text, View, Button} from 'react-native';
import styles from '../shared/styles';
import GoogleButton from '../components/GoogleButton';
import {
  useAddingTheft,
  useToggleAddingTheft,
} from '../shared/AddingTheftContext';

const CustomDrawerContent = ({navigation}) => {
  const isAddingNewTheft = useAddingTheft();
  const setIsAddingNewTheft = useToggleAddingTheft();

  function isAddingNewTheftController() {
    navigation.toggleDrawer();
    // add setState(old=>!old)
    setIsAddingNewTheft();
  }

  return (
    <View style={styles.drawerContainer}>
      <Text>your name</Text>
      <GoogleButton />
      <Button title={'add new'} onPress={isAddingNewTheftController} />
    </View>
  );
};

export default CustomDrawerContent;
