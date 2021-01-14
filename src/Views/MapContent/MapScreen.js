import React, {useState} from 'react';
import CustomMapView from './Components/CustomMapView';
import FormModal from '../ModalContent/FormModal';

const MapScreen = (props) => {
  const [selectedRegion, setSelectedRegion] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <CustomMapView
        {...props}
        setSelectedRegion={setSelectedRegion}
        setIsModalVisible={setIsModalVisible}
      />
      <FormModal
        isModalVisible={isModalVisible}
        selectedRegion={selectedRegion}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default MapScreen;
