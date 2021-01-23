import React, {useState, useEffect, useRef} from 'react';
import {Text} from 'react-native';
import {useQuery} from '@apollo/client';
import Geolocation from 'react-native-geolocation-service';
import TopBar from './TopBar';
import {GET_THEFTS} from '../../../Utils/gql';
import {useIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import CrosshairOverlay from './CrosshairOverlay';
import SearchBar from './SearchBar';
import MenuButton from './MenuButton';
import MapView from 'react-native-maps';
import MapLayerOverlay from './MapLayerOverlay';
import styles from '../mapStyles';

const CustomMapView = ({
  navigation,
  setSelectedRegion,
  setIsFormModalVisible,
  setIsViewModalVisible,
}) => {
  const mapRef = useRef();
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [thefts, setThefts] = useState();
  const [initialRegion, setInitialRegion] = useState();
  const [currentRegionBoundaries, setCurrentRegionBoundaries] = useState();
  const [nrOfTheftsInRegion, setNrOfTheftsInRegion] = useState();
  const [currentRegion, setCurrentRegion] = useState();
  const [margin, setMargin] = useState(1);
  const [visibleMapLayer, setVisibleMapLayer] = useState('heatmap');

  const {loading: get_loading, error: get_error, data: get_data} = useQuery(
    GET_THEFTS,
  );

  const isAddingNewTheft = useIsAddingNewTheft();

  //#region effects

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

  useEffect(() => {
    if (currentRegionBoundaries != null && thefts != null) {
      const theftsInRegion = thefts.filter(
        (theft) =>
          theft.region.longitude >=
            currentRegionBoundaries.southWest.longitude &&
          theft.region.longitude <=
            currentRegionBoundaries.northEast.longitude &&
          theft.region.latitude >= currentRegionBoundaries.southWest.latitude &&
          theft.region.latitude <= currentRegionBoundaries.northEast.latitude,
      );
      setNrOfTheftsInRegion(theftsInRegion.length);
    }
  }, [thefts, currentRegionBoundaries]);

  //#endregion

  //#region funcs
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
    if (roundThemUp(region.longitudeDelta) >= 0.2) {
      setVisibleMapLayer('heatmap');
    } else if (roundThemUp(region.longitudeDelta) < 0.2) {
      setVisibleMapLayer('markers');
    }
  }

  //#endregion

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
          <MapLayerOverlay
            visibleMapLayer={visibleMapLayer}
            thefts={thefts}
            setIsViewModalVisible={setIsViewModalVisible}
          />
        )}
      </MapView>
      {isAddingNewTheft && <CrosshairOverlay />}
      <MenuButton navigation={navigation} />
      <SearchBar mapRef={mapRef} />
      <TopBar nr={nrOfTheftsInRegion} />
    </>
  );
};

export default CustomMapView;
