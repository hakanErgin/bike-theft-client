import React from 'react';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {WEB_CLIENT_ID} from '@env';
import {CREATE_USER_OR_SIGN_IN} from '../shared/gql';
import {useMutation} from '@apollo/client';

const GoogleButton = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
  });

  const [createUserOrSignInMutation, {error: user_error}] = useMutation(
    CREATE_USER_OR_SIGN_IN,
  );

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      createUserOrSignInMutation({
        variables: {id_token: userInfo.idToken},
      }).then((result) => console.log(result));
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
      size={GoogleSigninButton.Size.Standard}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
};

export default GoogleButton;
