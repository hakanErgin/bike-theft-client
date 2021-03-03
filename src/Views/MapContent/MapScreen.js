import React, {useState} from 'react';
import CustomMapView from './Components/CustomMapView';
import FormModal from '../FormModalContent/FormModal';
import ViewModal from '../ViewModalContent/ViewModal';
import {useIsViewModalVisible} from '../../ContextProviders/IsViewModalVisibleContext';

const MapScreen = (props) => {
  const [selectedRegion, setSelectedRegion] = useState({});
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const isViewModalVisible = useIsViewModalVisible();

  return (
    <>
      <CustomMapView
        {...props}
        setSelectedRegion={setSelectedRegion}
        setIsFormModalVisible={setIsFormModalVisible}
      />
      {isFormModalVisible && (
        <FormModal
          selectedRegion={selectedRegion}
          isFormModalVisible={isFormModalVisible}
          setIsFormModalVisible={setIsFormModalVisible}
        />
      )}
      {isViewModalVisible && <ViewModal />}
    </>
  );
};

export default MapScreen;
