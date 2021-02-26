import React, {useContext, useState} from 'react';

const CurrentUser = React.createContext();
const SetCurrentUser = React.createContext();

export function useCurrentUser() {
  return useContext(CurrentUser);
}
export function useSetCurrentUser() {
  return useContext(SetCurrentUser);
}

export function CurrentUserProvider({children}) {
  const [currentUser, setCurrentUser] = useState();

  function changeCurrentUser(value) {
    setCurrentUser(value);
  }

  return (
    <CurrentUser.Provider value={currentUser}>
      <SetCurrentUser.Provider value={changeCurrentUser}>
        {children}
      </SetCurrentUser.Provider>
    </CurrentUser.Provider>
  );
}
