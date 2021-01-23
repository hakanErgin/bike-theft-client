import React, {useContext, useState} from 'react';

const IsViewModalVisible = React.createContext();
const ToggleIsViewModalVisible = React.createContext();

export function useIsViewModalVisible() {
  return useContext(IsViewModalVisible);
}
export function useToggleIsViewModalVisible() {
  return useContext(ToggleIsViewModalVisible);
}

export function IsViewModalVisibleProvider({children}) {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  function toggleIsViewModalVisible(boolean) {
    setIsViewModalVisible(boolean);
  }

  return (
    <IsViewModalVisible.Provider value={isViewModalVisible}>
      <ToggleIsViewModalVisible.Provider value={toggleIsViewModalVisible}>
        {children}
      </ToggleIsViewModalVisible.Provider>
    </IsViewModalVisible.Provider>
  );
}
