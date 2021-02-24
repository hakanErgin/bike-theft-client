import React, {useState, useEffect, useRef} from 'react';
import {useQuery} from '@apollo/client';
import {GET_THEFTS} from '../../../Utils/gql';
import setCurrentPosition from '../../../Utils/currentPositionHandler';

import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import InfoBar from './InfoBar';
import CrosshairOverlay from './CrosshairOverlay';
import SearchBar from './SearchBar';
import MenuButton from './MenuButton';
import MapLayerOverlay from './MapLayerOverlay';
import MyLocationButton from './MyLocationButton';
import {useIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import commonVariables from '../../../Utils/commonVariables';
import {LoadingView, ErrorView} from '../../../Utils/commonComponents';

/*
 * if onscreen buttons are necessary:
 * htps://github.com/react-native-maps/react-native-maps/issues/2010
 */

const CustomMapView = ({
  navigation,
  setSelectedRegion,
  setIsFormModalVisible,
}) => {
  const mapRef = useRef();
  const [thefts, setThefts] = useState();
  const [usersLocation, setUsersLocation] = useState();
  const [currentRegionBoundaries, setCurrentRegionBoundaries] = useState();
  const [currentRegion, setCurrentRegion] = useState();
  const [visibleMapLayer, setVisibleMapLayer] = useState('heatmap');

  const {loading: get_loading, error: get_error, data: get_data} = useQuery(
    GET_THEFTS,
  );

  const isAddingNewTheft = useIsAddingNewTheft();
  const {
    VISIBLE_LAYER_DEFINING_VALUE,
    MY_POSITION_ZOOM_LEVEL,
  } = commonVariables;

  // fetch thefts and set them to state
  useEffect(() => {
    get_data && setThefts(get_data.findThefts.items);
  }, [get_data]);

  // set initial location to my location

  useEffect(() => {
    setCurrentPosition(setUsersLocation);
    // removing dependancy here prevented re-render loop!!
  }, []);

  // set boundaries on region change
  useEffect(() => {
    mapRef.current != null &&
      mapRef.current
        .getMapBoundaries()
        .then((region) => setCurrentRegionBoundaries(region));
  }, [currentRegion]);

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
    return <LoadingView />;
  }
  if (get_error) {
    return <ErrorView error={get_error} />;
  }
  return (
    <>
      <MapView
        style={styles.map}
        customMapStyle={!isAddingNewTheft ? normalMapStyle : greyedMapStyle}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsUserLocation={true}
        showsMyLocationButton={false}
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={usersLocation}
        onRegionChangeComplete={updateStateAndMapLayers}
        ref={mapRef}>
        {thefts && (
          <MapLayerOverlay visibleMapLayer={visibleMapLayer} thefts={thefts} />
        )}
      </MapView>
      {isAddingNewTheft && (
        <CrosshairOverlay
          currentRegion={currentRegion}
          setSelectedRegion={setSelectedRegion}
          setIsFormModalVisible={setIsFormModalVisible}
        />
      )}
      <MenuButton navigation={navigation} isAddingNewTheft={isAddingNewTheft} />
      <SearchBar mapRef={mapRef} />
      {visibleMapLayer !== 'heatmap' && !isAddingNewTheft && (
        <InfoBar
          thefts={thefts}
          currentRegionBoundaries={currentRegionBoundaries}
        />
      )}
      <MyLocationButton
        ref={mapRef}
        usersLocation={usersLocation}
        MY_POSITION_ZOOM_LEVEL={MY_POSITION_ZOOM_LEVEL}
        setUsersLocation={setUsersLocation}
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

const normalMapStyle = [
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

const greyedMapStyle = [
  {
    stylers: [
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
