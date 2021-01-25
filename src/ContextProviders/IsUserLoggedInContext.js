import React, {useContext, useState} from 'react';

const IsUserLoggedIn = React.createContext();
const ToggleIsUserLoggedIn = React.createContext();

export function useIsUserLoggedIn() {
  return useContext(IsUserLoggedIn);
}
export function useToggleIsUserLoggedIn() {
  return useContext(ToggleIsUserLoggedIn);
}

export function IsUserLoggedInProvider({children}) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  function toggleIsUserLoggedIn(boolean) {
    setIsUserLoggedIn(boolean);
  }

  return (
    <IsUserLoggedIn.Provider value={isUserLoggedIn}>
      <ToggleIsUserLoggedIn.Provider value={toggleIsUserLoggedIn}>
        {children}
      </ToggleIsUserLoggedIn.Provider>
    </IsUserLoggedIn.Provider>
  );
}
