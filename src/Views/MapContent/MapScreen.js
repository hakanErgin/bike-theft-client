import React, {useState} from 'react';
import CustomMapView from './Components/CustomMapView';
import FormModal from '../ModalContent/FormModal';
import ViewModal from '../ModalContent/ViewModal';

const MapScreen = (props) => {
  const [selectedRegion, setSelectedRegion] = useState({});
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  return (
    <>
      <CustomMapView
        {...props}
        setSelectedRegion={setSelectedRegion}
        setIsFormModalVisible={setIsFormModalVisible}
      />
      <FormModal
        selectedRegion={selectedRegion}
        isFormModalVisible={isFormModalVisible}
        setIsFormModalVisible={setIsFormModalVisible}
      />
      <ViewModal
        isViewModalVisible={isViewModalVisible}
        setIsViewModalVisible={setIsViewModalVisible}
      />
    </>
  );
};

export default MapScreen;
