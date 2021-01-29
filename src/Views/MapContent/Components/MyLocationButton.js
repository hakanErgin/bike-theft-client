import React from 'react';
import {View, StyleSheet} from 'react-native';
import GpsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MyLocationButton({usersLocation, mapRef}) {
  const iconSize = 42;
  const iconColor = '#900';

  function goToLocation() {
    mapRef.current != null &&
      mapRef.current.animateToRegion(usersLocation, 1000);
  }
  return (
    <View style={styles.gpsIconContainer}>
      <GpsIcon
        name="crosshairs-gps"
        size={iconSize}
        color={iconColor}
        onPress={() => goToLocation()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gpsIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
