import React, {useContext, useState} from 'react';

const IsViewModalVisible = React.createContext();
const ToggleIsViewModalVisible = React.createContext();

export function useIsViewModalVisible() {
  return useContext(IsViewModalVisible);
}
export function useToggleIsViewModalVisible() {
  return useContext(ToggleIsViewModalVisible);
}
const SetterProvider = React.memo(({setIsViewModalVisible, children}) => (
  <ToggleIsViewModalVisible.Provider value={setIsViewModalVisible}>
    {children}
  </ToggleIsViewModalVisible.Provider>
));

export function IsViewModalVisibleProvider({children}) {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  return (
    <IsViewModalVisible.Provider value={isViewModalVisible}>
      <SetterProvider setIsViewModalVisible={setIsViewModalVisible}>
        {children}
      </SetterProvider>
    </IsViewModalVisible.Provider>
  );
}
