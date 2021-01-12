import React, {useState} from 'react';
import {Button, View} from 'react-native';
import CustomMapView from './Components/CustomMapView';
import ModalForm from '../ModalScreen/ModalForm';
import styles from '../../styles';
import {
  useIsModalVisible,
  useToggleIsModalVisible,
} from '../../ContextProviders/IsModalVisibleContext';

const MapScreen = ({navigation}) => {
  const [selectedRegion, setSelectedRegion] = useState({});
  const isModalVisible = useIsModalVisible();
  const setIsModalVisible = useToggleIsModalVisible();

  return (
    <>
      <CustomMapView
        setSelectedRegion={setSelectedRegion}
        setIsModalVisible={setIsModalVisible}
      />
      <View style={styles.menuBtnContainer}>
        <Button title={'menu'} onPress={() => navigation.toggleDrawer()} />
      </View>
      <ModalForm
        isModalVisible={isModalVisible}
        selectedRegion={selectedRegion}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default MapScreen;
