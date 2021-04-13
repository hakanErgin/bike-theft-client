import React, {useContext, useState} from 'react';

const CurrentUser = React.createContext();
const SetCurrentUser = React.createContext();

export function useCurrentUser() {
  return useContext(CurrentUser);
}
export function useSetCurrentUser() {
  return useContext(SetCurrentUser);
}
const SetterProvider = React.memo(({setCurrentUser, children}) => (
  <SetCurrentUser.Provider value={setCurrentUser}>
    {children}
  </SetCurrentUser.Provider>
));

export function CurrentUserProvider({children}) {
  const [currentUser, setCurrentUser] = useState();

  return (
    <CurrentUser.Provider value={currentUser}>
      <SetterProvider setCurrentUser={setCurrentUser}>
        {children}
      </SetterProvider>
    </CurrentUser.Provider>
  );
}
