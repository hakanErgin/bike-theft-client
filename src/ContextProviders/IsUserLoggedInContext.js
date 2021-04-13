import React, {useContext, useState} from 'react';

const IsUserLoggedIn = React.createContext();
const ToggleIsUserLoggedIn = React.createContext();

export function useIsUserLoggedIn() {
  return useContext(IsUserLoggedIn);
}
export function useToggleIsUserLoggedIn() {
  return useContext(ToggleIsUserLoggedIn);
}
const SetterProvider = React.memo(({setIsUserLoggedIn, children}) => (
  <ToggleIsUserLoggedIn.Provider value={setIsUserLoggedIn}>
    {children}
  </ToggleIsUserLoggedIn.Provider>
));

export function IsUserLoggedInProvider({children}) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <IsUserLoggedIn.Provider value={isUserLoggedIn}>
      <SetterProvider setIsUserLoggedIn={setIsUserLoggedIn}>
        {children}
      </SetterProvider>
    </IsUserLoggedIn.Provider>
  );
}
