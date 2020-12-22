import React, {useState} from 'react';
import {StyleSheet, Button, Text} from 'react-native';
import MapView, {Marker, Heatmap, Callout} from 'react-native-maps';
import {useQuery, useMutation, gql} from '@apollo/client';
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

  //#endregion

  function getZoomLevel(region) {
    const zoomLevel = {
      longitudeDelta: roundThemUp(region.longitudeDelta),
      latitudeDelta: roundThemUp(region.latitudeDelta),
    };

    function roundThemUp(original) {
      return Math.round(original * 100) / 10;
    }
    const {longitudeDelta, latitudeDelta} = zoomLevel;

    if ((longitudeDelta || latitudeDelta) >= 0.2) {
      setVisibleMapLayer('heatmap');
    } else if ((longitudeDelta || latitudeDelta) < 0.2) {
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
        initialRegion={BXL}
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
