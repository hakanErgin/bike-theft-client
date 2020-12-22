import React, {useState} from 'react';
import {Button, View} from 'react-native';
import CustomMapView from '../components/CustomMapView';
import FormModal from '../components/FormModal';
import styles from '../shared/styles';

const MapScreen = () => {
  const [isAddingNewTheft, setIsAddingNewTheft] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({});
  const [visibleMapLayer, setVisibleMapLayer] = useState('heatmap');

  // const [thefts, setThefts] = useState();

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
      <View style={styles.buttonContainer}>
        {visibleMapLayer === 'markers' && (
          <Button
            title={isAddingNewTheft ? 'choose location' : 'add new'}
            onPress={isAddingNewTheftController}
            color={isAddingNewTheft ? 'red' : '#2196F3'}
          />
        )}
      </View>
      <FormModal
        isModalVisible={isModalVisible}
        selectedRegion={selectedRegion}
        setIsModalVisible={setIsModalVisible}
        setIsAddingNewTheft={setIsAddingNewTheft}
      />
    </>
  );
};

export default MapScreen;
