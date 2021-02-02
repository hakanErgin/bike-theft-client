import React from 'react';
import {View, StyleSheet} from 'react-native';
import GpsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import setCurrentPosition from '../../../Utils/locationPermissions';

const MyLocationButton = React.forwardRef(
  ({MY_POSITION_ZOOM_LEVEL, usersLocation, setUsersLocation}, mapRef) => {
    const iconSize = 42;
    const iconColor = '#900';

    const ANIMATION_SPEED = 1000;

    function goToLocation() {
      if (mapRef.current != null) {
        if (usersLocation === undefined) {
          setCurrentPosition(
            setUsersLocation,
            MY_POSITION_ZOOM_LEVEL,
          ).then(() =>
            mapRef.current.animateToRegion(usersLocation, ANIMATION_SPEED),
          );
        } else {
          mapRef.current.animateToRegion(usersLocation, ANIMATION_SPEED);
        }
      }
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
  },
);

const styles = StyleSheet.create({
  gpsIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default MyLocationButton;
