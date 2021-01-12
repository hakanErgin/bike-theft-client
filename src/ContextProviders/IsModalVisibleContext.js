import React, {useContext, useState} from 'react';

const IsModalVisible = React.createContext();
const ToggleIsModalVisible = React.createContext();

export function useIsModalVisible() {
  return useContext(IsModalVisible);
}
export function useToggleIsModalVisible() {
  return useContext(ToggleIsModalVisible);
}

export function IsModalVisibleProvider({children}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleIsModalVisible(param) {
    setIsModalVisible(param);
  }

  return (
    <IsModalVisible.Provider value={isModalVisible}>
      <ToggleIsModalVisible.Provider value={toggleIsModalVisible}>
        {children}
      </ToggleIsModalVisible.Provider>
    </IsModalVisible.Provider>
  );
}
