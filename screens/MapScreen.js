import React, {useState} from 'react';
import {StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import TheftForm from '../components/TheftForm';
import CustomMapView from '../components/CustomMapView';

const MapScreen = () => {
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [addingNewTheft, setAddingNewTheft] = useState(false);
  // const [thefts, setThefts] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({});

  function cancelAdding() {
    setModalVisible(false);
    setAddingNewTheft(false);
    // const tempState = thefts;
    // tempState.pop();
    // setThefts(tempState);
  }

  function addingNewTheftController() {
    !addingNewTheft ? setAddingNewTheft(true) : setAddingNewTheft(false);
  }

  return (
    <>
      <CustomMapView
        setSelectedRegion={setSelectedRegion}
        addingNewTheft={addingNewTheft}
        setModalVisible={setModalVisible}
      />
      <Button
        title={addingNewTheft ? 'choose location' : 'add new'}
        onPress={addingNewTheftController}
        color={addingNewTheft ? 'red' : '#2196F3'}
      />
      <Modal isVisible={isModalVisible}>
        <TheftForm
          cancelAdding={cancelAdding}
          selectedRegion={selectedRegion}
          setModalVisible={setModalVisible}
        />
      </Modal>
    </>
  );
};

export default MapScreen;
