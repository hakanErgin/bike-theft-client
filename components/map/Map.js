/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Map = () => {
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [margin, setMargin] = React.useState(1);

  return (
    <MapView
      style={{...styles.map, margin}}
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      zoomControlEnabled={true}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onMapReady={() => setMargin(0)}
    />
  );
};

export default Map;
