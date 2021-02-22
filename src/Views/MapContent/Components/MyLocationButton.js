import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import GpsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import setCurrentPosition from '../../../Utils/currentPositionHandler';
import commonStyles from '../../../Utils/commonStyles';
import commonVariables from '../../../Utils/commonVariables';

const MyLocationButton = React.forwardRef(
  ({usersLocation, setUsersLocation}, mapRef) => {
    const ANIMATION_SPEED = commonVariables.ANIMATION_SPEED;
    function goToLocation() {
      if (mapRef.current != null) {
        if (usersLocation === undefined) {
          setCurrentPosition(setUsersLocation).then(() =>
            mapRef.current.animateToRegion(usersLocation, ANIMATION_SPEED),
          );
        } else {
          mapRef.current.animateToRegion(usersLocation, ANIMATION_SPEED);
        }
      }
    }
    return (
      <TouchableOpacity
        onPress={() => goToLocation()}
        style={{
          backgroundColor: commonStyles.containerBackgroundColor.light,
          borderRadius: commonStyles.borderRadius.normal,
          marginVertical: 4,
        }}>
        <GpsIcon name="crosshairs-gps" style={styles.gpsIcon} />
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  gpsIcon: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
});

export default MyLocationButton;
