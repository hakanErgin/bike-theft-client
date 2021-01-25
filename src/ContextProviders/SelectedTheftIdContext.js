import React, {useContext, useState} from 'react';

const SelectedTheftId = React.createContext();
const SetSelectedTheftId = React.createContext();

export function useSelectedTheftId() {
  return useContext(SelectedTheftId);
}
export function useSetSelectedTheftId() {
  return useContext(SetSelectedTheftId);
}

export function SelectedTheftIdProvider({children}) {
  const [selectedTheftId, setSelectedTheftId] = useState();

  function changeSelectedTheftId(value) {
    setSelectedTheftId(value);
  }

  return (
    <SelectedTheftId.Provider value={selectedTheftId}>
      <SetSelectedTheftId.Provider value={changeSelectedTheftId}>
        {children}
      </SetSelectedTheftId.Provider>
    </SelectedTheftId.Provider>
  );
}
