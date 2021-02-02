import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import GpsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import setCurrentPosition from '../../../Utils/currentPositionHandler';
import commonStyles from '../../../Utils/commonStyles';

const MyLocationButton = React.forwardRef(
  ({MY_POSITION_ZOOM_LEVEL, usersLocation, setUsersLocation}, mapRef) => {
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
      <TouchableOpacity
        style={styles.gpsIconContainer}
        onPress={() => goToLocation()}>
        <GpsIcon
          name="crosshairs-gps"
          size={commonStyles.iconSize.xl}
          color={commonStyles.iconColor.darkRed}
        />
      </TouchableOpacity>
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
