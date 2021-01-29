import React, {useState, useEffect, useRef} from 'react';
import {useQuery} from '@apollo/client';
import {GET_THEFTS} from '../../../Utils/gql';
import Geolocation from 'react-native-geolocation-service';

import {Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import InfoBar from './InfoBar';
import CrosshairOverlay from './CrosshairOverlay';
import SearchBar from './SearchBar';
import MenuButton from './MenuButton';
import MapLayerOverlay from './MapLayerOverlay';
import {useIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';

const CustomMapView = ({
  navigation,
  setSelectedRegion,
  setIsFormModalVisible,
}) => {
  const mapRef = useRef();
  const [thefts, setThefts] = useState();
  const [initialRegion, setInitialRegion] = useState();
  const [currentRegionBoundaries, setCurrentRegionBoundaries] = useState();
  const [currentRegion, setCurrentRegion] = useState();
  const [visibleMapLayer, setVisibleMapLayer] = useState('heatmap');
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [margin, setMargin] = useState(1);

  const {loading: get_loading, error: get_error, data: get_data} = useQuery(
    GET_THEFTS,
  );

  const isAddingNewTheft = useIsAddingNewTheft();
  const VISIBLE_LAYER_DEFINING_VALUE = 0.2;
  const MY_POSITION_ZOOM_LEVEL = 0.01;

  // fetch thefts and set them to state
  useEffect(() => {
    get_data && setThefts(get_data.findThefts.items);
  }, [get_data]);

  // focus on my location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setInitialRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: MY_POSITION_ZOOM_LEVEL,
          longitudeDelta: MY_POSITION_ZOOM_LEVEL,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  // set boundaries on region change
  useEffect(() => {
    (async function () {
      return (
        mapRef.current != null &&
        mapRef.current
          .getMapBoundaries()
          .then((region) => setCurrentRegionBoundaries(region))
      );
    })();
  }, [currentRegion]);

  function onMapPress(theft) {
    if (isAddingNewTheft === true) {
      const {latitude, longitude} = currentRegion; // theft.nativeEvent.coordinate;
      const region = {latitude, longitude};
      setSelectedRegion(region);
      setIsFormModalVisible(true);
    }
  }

  function updateStateAndMapLayers(region) {
    setCurrentRegion(region);
    function roundThemUp(original) {
      return Math.round(original * 100) / 10;
    }
    function handleVisibleMapLayer() {
      if (roundThemUp(region.longitudeDelta) >= VISIBLE_LAYER_DEFINING_VALUE) {
        return 'heatmap';
      } else if (
        roundThemUp(region.longitudeDelta) < VISIBLE_LAYER_DEFINING_VALUE
      ) {
        return 'markers';
      }
    }
    setVisibleMapLayer(handleVisibleMapLayer());
  }

  if (get_loading) {
    return <Text>Loading...</Text>;
  }
  if (get_error) {
    console.log(get_error);
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
        onRegionChangeComplete={updateStateAndMapLayers}
        ref={mapRef}>
        {thefts && (
          <MapLayerOverlay visibleMapLayer={visibleMapLayer} thefts={thefts} />
        )}
      </MapView>
      {isAddingNewTheft && <CrosshairOverlay />}
      <MenuButton navigation={navigation} />
      <SearchBar mapRef={mapRef} />
      <InfoBar
        thefts={thefts}
        currentRegionBoundaries={currentRegionBoundaries}
      />
    </>
  );
};

export default CustomMapView;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
