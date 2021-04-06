import React, {useState, useEffect, useRef} from 'react';
import {useQuery} from '@apollo/client';
import {GET_THEFTS} from '../../../Utils/gql';
import setCurrentPosition from '../../../Utils/currentPositionHandler';
import {
  greyedMapStyle,
  heatMapStyle,
  normalMapStyle,
} from '../../../Utils/mapStyles';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import InfoBar from './InfoBar';
import CrosshairOverlay from './CrosshairOverlay';
import SearchBar from './SearchBar';
import MenuButton from './MenuButton';
import MapLayerOverlay from './MapLayerOverlay';
import MyLocationButton from './MyLocationButton';
import {useIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import commonVariables, {
  BRUSSELS_LOCATION,
} from '../../../Utils/commonVariables';
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
    ADDING_THEFT_ZOOM_LEVEL_CAP,
    MY_POSITION_ZOOM_LEVEL,
    ANIMATION_SPEED,
  } = commonVariables;

  // fetch thefts and set them to state
  useEffect(() => {
    get_data && setThefts(get_data.findThefts.items);
  }, [get_data]);

  // set initial location to my location
  useEffect(() => {
    if (usersLocation && mapRef.current != null) {
      mapRef.current.animateToRegion(usersLocation, ANIMATION_SPEED);
    }
  }, [usersLocation, ANIMATION_SPEED]);

  useEffect(() => {
    setCurrentPosition(setUsersLocation);
  }, []); // users location dependency causes rerenders

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

  const getMapStyle = () => {
    if (isAddingNewTheft) {
      return greyedMapStyle;
    } else {
      if (visibleMapLayer === 'heatmap') {
        return heatMapStyle;
      } else {
        return normalMapStyle;
      }
    }
  };

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
        customMapStyle={getMapStyle()}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsCompass={false}
        showsUserLocation={true}
        showsMyLocationButton={false}
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={BRUSSELS_LOCATION}
        onRegionChangeComplete={updateStateAndMapLayers}
        minZoomLevel={isAddingNewTheft ? ADDING_THEFT_ZOOM_LEVEL_CAP : 0}
        ref={mapRef}>
        {thefts && (
          <MapLayerOverlay
            visibleMapLayer={visibleMapLayer}
            thefts={thefts}
            isAddingNewTheft={isAddingNewTheft}
          />
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
