import React, {useState, useEffect, useRef} from 'react';
import {Text} from 'react-native';
import {useQuery} from '@apollo/client';
import Geolocation from 'react-native-geolocation-service';
import TopBar from './TopBar';
import {GET_THEFTS} from '../../../Utils/gql';
import {useIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import CrosshairOverlay from './CrosshairOverlay';
import SearchBar from './SearchBar';
import Map from './Map';
import MenuButton from './MenuButton';

const CustomMapView = ({setSelectedRegion, setIsModalVisible, navigation}) => {
  const mapRef = useRef();
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [thefts, setThefts] = useState();
  const [initialRegion, setInitialRegion] = useState();
  const [currentRegionBoundaries, setCurrentRegionBoundaries] = useState();
  const [nrOfTheftsInRegion, setNrOfTheftsInRegion] = useState();
  const [currentRegion, setCurrentRegion] = useState();

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

  if (get_loading) {
    return <Text>Loading...</Text>;
  }

  if (get_error) {
    console.log(get_error);
  }

  return (
    <>
      <Map
        mapRef={mapRef}
        initialRegion={initialRegion}
        isAddingNewTheft={isAddingNewTheft}
        setSelectedRegion={setSelectedRegion}
        setIsModalVisible={setIsModalVisible}
        currentRegion={currentRegion}
        setCurrentRegion={setCurrentRegion}
        thefts={thefts}
      />
      {isAddingNewTheft && <CrosshairOverlay />}
      <MenuButton navigation={navigation} />
      <SearchBar mapRef={mapRef} />
      <TopBar nr={nrOfTheftsInRegion} />
    </>
  );
};

export default CustomMapView;
