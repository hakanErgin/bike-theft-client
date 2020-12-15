import React, {useState, useEffect} from 'react';
import {StyleSheet, Button} from 'react-native';
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
    latitude: 50.850403778518455,
    longitude: 4.351369813084602,
    latitudeDelta: 0.0864, //y
    longitudeDelta: 0.0535, //x
  });
  const [addingNewTheft, setAddingNewTheft] = useState(false);

  function onRegionChange(region) {
    // console.log(regionState);
    setRegionState(region);
  }

  function onMapPress(a) {
    console.log(a.nativeEvent);
  }

  return (
    <>
      <Button title="a" />
      <MapView
        style={{...styles.map, margin}}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        zoomControlEnabled={true}
        onMapReady={() => setMargin(0)}
        region={regionState}
        onRegionChangeComplete={onRegionChange}
        onPress={onMapPress}
      />
    </>
  );
};

export default Map;
