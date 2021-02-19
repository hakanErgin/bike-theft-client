import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {WEB_CLIENT_ID} from '@env';
import {useMutation} from '@apollo/client';
import {CREATE_USER_OR_SIGN_IN} from './gql';
import {useToggleIsUserLoggedIn} from '../ContextProviders/IsUserLoggedInContext';
import SignOutIcon from 'react-native-vector-icons/Entypo';

export const SignInButton = () => {
  const setIsUserLoggedIn = useToggleIsUserLoggedIn();

  useEffect(() => {
    configureGoogle();
  }, []);

  const [createUserOrSignInMutation] = useMutation(CREATE_USER_OR_SIGN_IN, {
    onError: (err) => console.log(err),
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      createUserOrSignInMutation({
        variables: {id_token: userInfo.idToken},
      }).then((result) => {
        setIsUserLoggedIn(true);
      });
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

export const LogoutButton = ({setIsAddingNewTheft, size, color}) => {
  const setIsUserLoggedIn = useToggleIsUserLoggedIn();
  const signOut = async () => {
    try {
      setIsAddingNewTheft(false);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut().then(() => setIsUserLoggedIn(false));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity onPress={signOut}>
      <SignOutIcon name={'log-out'} size={size} color={color} />
    </TouchableOpacity>
  );
};

// helper function
export async function isSignedInToGoogle() {
  return await GoogleSignin.isSignedIn();
}

export async function getCurrentUser() {
  return await GoogleSignin.getCurrentUser();
}

export async function getToken() {
  return await GoogleSignin.getTokens();
}

export async function signUserInSilently() {
  configureGoogle();
  return await GoogleSignin.signInSilently();
}

function configureGoogle() {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });
}

// async function handleSignIn() {
//   const isUserSignedIn = await isSignedInToGoogle();
//   if (isUserSignedIn === true) {
//     return await getCurrentUser();
//   } else {
//     return await signUserInSilently();
//   }
// }

// status button for dev
// export const CheckUserButton = (isUserLoggedIn) => {
//   async function checkUser() {
//     const isSignedIn = await GoogleSignin.isSignedIn();
//     console.log({isSignedIn});
//     const currentUser = await GoogleSignin.getCurrentUser();
//     console.log({currentUser});
//     const userInfo = await GoogleSignin.signInSilently();
//     console.log({userInfo});
//   }
//   return <Button title={'status'} onPress={checkUser} />;
// };
