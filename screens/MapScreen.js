import React, {useState} from 'react';
import {Button, View} from 'react-native';
import CustomMapView from '../components/CustomMapView';
import ModalForm from '../components/ModalForm';
import styles from '../shared/styles';
import GoogleButton from '../components/GoogleButton';

const MapScreen = () => {
  const [isAddingNewTheft, setIsAddingNewTheft] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({});
  const [visibleMapLayer, setVisibleMapLayer] = useState('heatmap');

  function isAddingNewTheftController() {
    !isAddingNewTheft ? setIsAddingNewTheft(true) : setIsAddingNewTheft(false);
  }

  return (
    <>
      <CustomMapView
        setSelectedRegion={setSelectedRegion}
        isAddingNewTheft={isAddingNewTheft}
        setIsModalVisible={setIsModalVisible}
        visibleMapLayer={visibleMapLayer}
        setVisibleMapLayer={setVisibleMapLayer}
      />
      <View style={styles.addBtnContainer}>
        {visibleMapLayer === 'markers' && (
          <Button
            title={isAddingNewTheft ? 'choose location' : 'add new'}
            onPress={isAddingNewTheftController}
            color={isAddingNewTheft ? 'red' : '#2196F3'}
          />
        )}
      </View>
      <View style={styles.googleBtnContainer}>
        <GoogleButton />
      </View>
      <ModalForm
        isModalVisible={isModalVisible}
        selectedRegion={selectedRegion}
        setIsModalVisible={setIsModalVisible}
        setIsAddingNewTheft={setIsAddingNewTheft}
      />
    </>
  );
};

export default MapScreen;
