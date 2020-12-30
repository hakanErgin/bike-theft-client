import React, {useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {WEB_CLIENT_ID} from '@env';

const GoogleButton = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log({error});
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log({error});
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log({error});
        // play services not available or outdated
      } else {
        console.log({error});
        // some other error happened
      }
    }
  };
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Icon}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
};

export default GoogleButton;
