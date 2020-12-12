import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Map = () => {
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [margin, setMargin] = useState(1);
  const [regionState, setRegionState] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  function onRegionChange(region) {
    console.log(regionState);
    setRegionState(region);
  }

  return (
    <MapView
      style={{...styles.map, margin}}
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      zoomControlEnabled={true}
      onMapReady={() => setMargin(0)}
      region={regionState}
      onRegionChangeComplete={onRegionChange}
    />
  );
};

export default Map;
