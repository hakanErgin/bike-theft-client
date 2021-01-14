import React, {useContext, useState} from 'react';

const IsAddingNewTheft = React.createContext();
const ToggleIsAddingNewTheft = React.createContext();

export function useIsAddingNewTheft() {
  return useContext(IsAddingNewTheft);
}
export function useToggleIsAddingNewTheft() {
  return useContext(ToggleIsAddingNewTheft);
}

export function IsAddingNewTheftProvider({children}) {
  const [isAddingNewTheft, setIsAddingNewTheft] = useState(false);

  function toggleIsAddingNewTheft() {
    setIsAddingNewTheft((current) => !current);
  }

  return (
    <IsAddingNewTheft.Provider value={isAddingNewTheft}>
      <ToggleIsAddingNewTheft.Provider value={toggleIsAddingNewTheft}>
        {children}
      </ToggleIsAddingNewTheft.Provider>
    </IsAddingNewTheft.Provider>
  );
}
