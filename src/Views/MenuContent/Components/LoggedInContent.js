import React, {useEffect, useState} from 'react';
import {Text, View, Button, ScrollView} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useToggleIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import {LogoutButton} from './GoogleButtons';
import {GET_USERS_THEFTS} from '../../../Utils/gql';
import {useQuery} from '@apollo/client';
import UsersReportsList from './UsersReportsList';

function UsersReportedThefts({currentUser}) {
  const [currentUsersThefts, setcurrentUsersThefts] = useState();
  const {error: get_error, data: get_data} = useQuery(GET_USERS_THEFTS, {
    variables: {id_token: currentUser.idToken},
    onCompleted: (data) => setcurrentUsersThefts(data.getUsersReportedThefts),
  });
  return (
    <ScrollView>
      <Text>{currentUser.user.name}</Text>
      {currentUsersThefts && currentUsersThefts.length > 0 && (
        <UsersReportsList currentUsersThefts={currentUsersThefts} />
      )}
    </ScrollView>
  );
}

export default function LoggedInContent({navigation}) {
  const [currentUser, setCurrentUser] = useState();
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  // if logged in, make sure token and all is up to date
  useEffect(() => {
    async function refreshUserInfo() {
      return await GoogleSignin.signInSilently();
    }
    refreshUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => console.log('refreshUserInfo' + err));
  }, []);

  useEffect(() => {}, []);

  function isAddingNewTheftController() {
    navigation.toggleDrawer();
    setIsAddingNewTheft();
  }

  return (
    <View>
      {currentUser && <UsersReportedThefts currentUser={currentUser} />}
      <Button title={'add new'} onPress={isAddingNewTheftController} />
      <LogoutButton />
    </View>
  );
}
