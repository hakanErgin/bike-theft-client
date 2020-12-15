import React, {useState} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useQuery, gql} from '@apollo/client';
import Modal from 'react-native-modal';
import TheftForm from './TheftForm';

const BXL = {
  latitude: 50.850403778518455,
  longitude: 4.351369813084602,
  latitudeDelta: 0.0864, //y
  longitudeDelta: 0.0535, //x
};

const GET_THEFTS = gql`
  {
    findThefts {
      items {
        _id
        region {
          latitude
          longitude
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  modal: {
    flex: 0.75,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 20,
  },
});

const Map = () => {
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [margin, setMargin] = useState(1);
  const [addingNewTheft, setAddingNewTheft] = useState(false);
  const [thefts, setThefts] = useState([]);
  const {loading, error} = useQuery(GET_THEFTS, {
    onCompleted: (theftsData) => setThefts(theftsData.findThefts.items),
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState({});

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error :(</Text>;
  }

  function cancelAdding() {
    setModalVisible(false);
    setAddingNewTheft(false);
  }

  function applyAdding() {}

  function onMapPress(theft) {
    if (addingNewTheft === true) {
      const {latitude, longitude} = theft.nativeEvent.coordinate;
      const region = {latitude, longitude};
      setThefts([...thefts, {region}]);
      setModalVisible(true);
    }
  }

  function addingNewTheftController() {
    !addingNewTheft ? setAddingNewTheft(true) : setAddingNewTheft(false);
  }

  return (
    <>
      <Button
        title={addingNewTheft ? 'choose location' : 'add new'}
        onPress={addingNewTheftController}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <TheftForm />
          <View>
            <Button title="Save" onPress={applyAdding} />
            <Button title="Cancel" onPress={cancelAdding} />
          </View>
        </View>
      </Modal>
      <MapView
        style={{...styles.map, margin}}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        onMapReady={() => setMargin(0)}
        initialRegion={BXL}
        onPress={onMapPress}>
        {thefts.map((theft, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: theft.region.latitude,
              longitude: theft.region.longitude,
            }}
            title={'aa'}
            description={'asdfs'}
          />
        ))}
      </MapView>
    </>
  );
};

export default Map;
