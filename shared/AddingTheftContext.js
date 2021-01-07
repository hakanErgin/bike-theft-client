import React, {useContext, useState} from 'react';

const AddingTheft = React.createContext();
const ToggleAddingTheft = React.createContext();

export function useAddingTheft() {
  return useContext(AddingTheft);
}
export function useToggleAddingTheft() {
  return useContext(ToggleAddingTheft);
}

export function AddingTheftProvider({children}) {
  const [isAddingNewTheft, setIsAddingNewTheft] = useState(false);

  function toggleIsAddingNewTheft() {
    setIsAddingNewTheft((current) => !current);
  }

  return (
    <AddingTheft.Provider value={isAddingNewTheft}>
      <ToggleAddingTheft.Provider value={toggleIsAddingNewTheft}>
        {children}
      </ToggleAddingTheft.Provider>
    </AddingTheft.Provider>
  );
}
