import React, {useContext, useState} from 'react';

const IsAddingNewTheft = React.createContext();
const ToggleIsAddingNewTheft = React.createContext();

export function useIsAddingNewTheft() {
  return useContext(IsAddingNewTheft);
}
export function useToggleIsAddingNewTheft() {
  return useContext(ToggleIsAddingNewTheft);
}
const SetterProvider = React.memo(({setIsAddingNewTheft, children}) => (
  <ToggleIsAddingNewTheft.Provider value={setIsAddingNewTheft}>
    {children}
  </ToggleIsAddingNewTheft.Provider>
));

export function IsAddingNewTheftProvider({children}) {
  const [isAddingNewTheft, setIsAddingNewTheft] = useState(false);

  return (
    <IsAddingNewTheft.Provider value={isAddingNewTheft}>
      <SetterProvider setIsAddingNewTheft={setIsAddingNewTheft}>
        {children}
      </SetterProvider>
    </IsAddingNewTheft.Provider>
  );
}
