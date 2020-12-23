import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import MapView, {Marker, Heatmap, Callout} from 'react-native-maps';
import {useQuery, useMutation} from '@apollo/client';
import styles from '../shared/styles';
import Geolocation from 'react-native-geolocation-service';
import {GET_THEFTS, DELETE_THEFT} from '../shared/gql';

const CustomMapView = ({
  setSelectedRegion,
  isAddingNewTheft,
  setIsModalVisible,
  visibleMapLayer,
  setVisibleMapLayer,
}) => {
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [margin, setMargin] = useState(1);
  const [thefts, setThefts] = useState();
  const [initialRegion, setInitialRegion] = useState();

  const {loading: get_loading, error: get_error, data: get_data} = useQuery(
    GET_THEFTS,
  );
  const [
    submitDeleteMutation,
    {error: delete_error},
  ] = useMutation(DELETE_THEFT, {refetchQueries: [{query: GET_THEFTS}]});

  useEffect(() => {
    get_data && setThefts(get_data.findThefts.items);
  }, [get_data]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setInitialRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  if (get_loading) {
    return <Text>Loading...</Text>;
  }

  if (delete_error || get_error) {
    console.log(delete_error || get_error);
  }

  function onMapPress(theft) {
    if (isAddingNewTheft === true) {
      const {latitude, longitude} = theft.nativeEvent.coordinate;
      const region = {latitude, longitude};
      setSelectedRegion(region);
      setIsModalVisible(true);
    }
  }

  const deleteTheft = (theftId) => () => {
    submitDeleteMutation({
      variables: {input: {_id: theftId}},
    });
  };

  function getZoomLevel(region) {
    function roundThemUp(original) {
      return Math.round(original * 100) / 10;
    }
    if (roundThemUp(region.longitudeDelta) >= 0.2) {
      setVisibleMapLayer('heatmap');
    } else if (roundThemUp(region.longitudeDelta) < 0.2) {
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
    </>
  );
};

export default CustomMapView;
