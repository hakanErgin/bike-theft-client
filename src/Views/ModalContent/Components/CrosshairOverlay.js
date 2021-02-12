import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Crosshair from 'react-native-vector-icons/MaterialCommunityIcons';
import Check from 'react-native-vector-icons/AntDesign';
import Cancel from 'react-native-vector-icons/AntDesign';
import commonStyles from '../../../Utils/commonStyles';
import {useToggleIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';

export default function CrosshairOverlay({
  currentRegion,
  setSelectedRegion,
  setIsFormModalVisible,
}) {
  function confirmLocation() {
    const {latitude, longitude} = currentRegion;
    const region = {latitude, longitude};
    setSelectedRegion(region);
    setIsFormModalVisible(true);
  }

  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  return (
    <>
      <View style={styles.topInfoContainer}>
        <Text style={styles.topInfoText}>
          Please choose where your bike was stolen using the indicator at the
          center.
        </Text>
      </View>
      <View style={styles.crosshairContainer}>
        <Crosshair name="crosshairs" style={styles.crosshair} />
      </View>
      <TouchableOpacity
        style={styles.checkContainer}
        onPress={() => confirmLocation()}>
        <Check name="checkcircleo" style={styles.check} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelContainer}
        onPress={() => setIsAddingNewTheft(false)}>
        <Cancel name="closecircleo" style={styles.cancel} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  topInfoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 75,
    paddingHorizontal: commonStyles.gap[0],
    maxWidth: '90%',
    borderRadius: commonStyles.borderRadius.small,
    backgroundColor: commonStyles.containerBackgroundColor.light,
  },
  topInfoText: {textAlign: 'center'},
  crosshair: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  crosshairContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  check: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  checkContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: commonStyles.gap[2],
    bottom: commonStyles.gap[2],
    borderRadius: commonStyles.borderRadius.small,
    backgroundColor: commonStyles.containerBackgroundColor.light,
  },
  cancel: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  cancelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: commonStyles.gap[2],
    bottom: commonStyles.gap[2],
    borderRadius: commonStyles.borderRadius.small,
    backgroundColor: commonStyles.containerBackgroundColor.light,
  },
});
