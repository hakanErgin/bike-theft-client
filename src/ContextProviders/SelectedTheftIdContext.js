import React, {useContext, useState} from 'react';

const SelectedTheftId = React.createContext();
const SetSelectedTheftId = React.createContext();

export function useSelectedTheftId() {
  return useContext(SelectedTheftId);
}
export function useSetSelectedTheftId() {
  return useContext(SetSelectedTheftId);
}
const SetterProvider = React.memo(({setSelectedTheftId, children}) => (
  <SetSelectedTheftId.Provider value={setSelectedTheftId}>
    {children}
  </SetSelectedTheftId.Provider>
));

export function SelectedTheftIdProvider({children}) {
  const [selectedTheftId, setSelectedTheftId] = useState();

  return (
    <SelectedTheftId.Provider value={selectedTheftId}>
      <SetterProvider setSelectedTheftId={setSelectedTheftId}>
        {children}
      </SetterProvider>
    </SelectedTheftId.Provider>
  );
}
