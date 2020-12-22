import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, Text} from 'react-native';
import MapView, {Marker, Heatmap, Callout} from 'react-native-maps';
import {useQuery, useMutation, gql} from '@apollo/client';
import Modal from 'react-native-modal';
import TheftForm from './TheftForm';
import Geolocation from 'react-native-geolocation-service';

const GET_THEFTS = gql`
  {
    findThefts {
      items {
        _id
        bike_description
        comments
        date
        region {
          latitude
          longitude
        }
      }
    }
  }
`;

const DELETE_THEFT = gql`
  mutation($input: MutateTheftInput!) {
    deleteTheft(input: $input) {
      _id
    }
  }
`;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Map = () => {
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [margin, setMargin] = useState(1);
  const [addingNewTheft, setAddingNewTheft] = useState(false);
  const [thefts, setThefts] = useState();
  const {get_loading, get_error} = useQuery(GET_THEFTS, {
    onCompleted: (theftsData) => setThefts(theftsData.findThefts.items),
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({});
  const [submitDeleteMutation, {delete_data, delete_error}] = useMutation(
    DELETE_THEFT,
  );
  const [visibleMapLayer, setVisibleMapLayer] = useState('heatmap');
  const [initialRegion, setInitialRegion] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        setInitialRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  //#region
  if (get_loading) {
    return <Text>Loading...</Text>;
  }

  if (delete_error || get_error) {
    console.log(delete_error || get_error);
  }

  function cancelAdding() {
    setModalVisible(false);
    setAddingNewTheft(false);
    const tempState = thefts;
    tempState.pop();
    setThefts(tempState);
  }

  function onMapPress(theft) {
    if (addingNewTheft === true) {
      const {latitude, longitude} = theft.nativeEvent.coordinate;
      const region = {latitude, longitude};
      setSelectedRegion(region);
      setThefts([...thefts, {region}]);
      setModalVisible(true);
    }
  }

  function addingNewTheftController() {
    !addingNewTheft ? setAddingNewTheft(true) : setAddingNewTheft(false);
  }

  const deleteTheft = (theftId) => () => {
    // console.log(theftId);
    submitDeleteMutation({
      variables: {input: {_id: theftId}},
    });
  };

  function getZoomLevel(region) {
    const zoomLevel = {
      longitudeDelta: roundThemUp(region.longitudeDelta),
      latitudeDelta: roundThemUp(region.latitudeDelta),
    };

    function roundThemUp(original) {
      return Math.round(original * 100) / 10;
    }
    const {longitudeDelta} = zoomLevel;

    if (longitudeDelta >= 0.2) {
      setVisibleMapLayer('heatmap');
    } else if (longitudeDelta < 0.2) {
      setVisibleMapLayer('markers');
    }
  }

  function renderVisibleLayer() {
    if (visibleMapLayer === 'heatmap') {
      return <Heatmap points={thefts.map((t) => t.region)} />;
    } else if (visibleMapLayer === 'markers') {
      return thefts.map((theft, index) => {
        const theftId = theft._id;
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: theft.region.latitude,
              longitude: theft.region.longitude,
            }}>
            <Callout onPress={deleteTheft(theftId)}>
              <Text>id: {theftId}</Text>
              <Text>stuff that happened here</Text>
              <Text>Tap for details</Text>
            </Callout>
          </Marker>
        );
      });
    }
  }
  //#endregion

  delete_data && console.log(delete_data);
  return (
    <>
      <MapView
        style={{...styles.map, margin}}
        showsBuildings={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        onMapReady={() => setMargin(0)}
        initialRegion={initialRegion}
        onPress={onMapPress}
        onRegionChangeComplete={getZoomLevel}>
        {thefts && renderVisibleLayer()}
      </MapView>
      <Button
        title={addingNewTheft ? 'choose location' : 'add new'}
        onPress={addingNewTheftController}
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

export default Map;
