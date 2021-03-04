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
      <View style={styles.crosshairContainer}>
        <Crosshair name="crosshairs" style={styles.crosshair} />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => confirmLocation()}>
          <Check name="checkcircleo" style={styles.check} />
        </TouchableOpacity>
        <Text style={styles.infoText}>
          Please choose where your bike was stolen using the indicator at the
          center.
        </Text>
        <TouchableOpacity
          style={styles.cancelContainer}
          onPress={() => setIsAddingNewTheft(false)}>
          <Cancel name="closecircleo" style={styles.cancel} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  crosshairContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  crosshair: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: commonStyles.containerBackgroundColor.light,
    paddingHorizontal: commonStyles.gap[3],
    padding: commonStyles.gap[2],
    width: '100%',
    elevation: 10,
  },
  infoText: {
    textAlign: 'center',
    width: '65%',
    padding: commonStyles.gap[1],
  },
  check: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  checkContainer: {
    borderRadius: commonStyles.borderRadius.xl,
    backgroundColor: commonStyles.containerBackgroundColor.light,
    elevation: 3,
  },
  cancel: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  cancelContainer: {
    borderRadius: commonStyles.borderRadius.xl,
    backgroundColor: commonStyles.containerBackgroundColor.light,
    elevation: 3,
  },
});
