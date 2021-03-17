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
    ADDING_THEFT_ZOOM_LEVEL_CAP,
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
        initialRegion={usersLocation}
        onRegionChangeComplete={updateStateAndMapLayers}
        minZoomLevel={isAddingNewTheft ? ADDING_THEFT_ZOOM_LEVEL_CAP : 0}
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
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
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
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

const heatMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];
