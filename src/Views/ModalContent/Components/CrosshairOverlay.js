import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Crosshair from 'react-native-vector-icons/MaterialCommunityIcons';
import Check from 'react-native-vector-icons/AntDesign';
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
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Please choose where your bike was stolen using the indicator at the
          center.
        </Text>
      </View>
      <View style={styles.crosshairContainer}>
        <Crosshair
          name="crosshairs"
          size={commonStyles.iconSize.xl}
          color={commonStyles.iconColor.darkRed}
        />
      </View>
      <TouchableOpacity
        style={styles.checkContainer}
        onPress={() => confirmLocation()}>
        <Check
          name="checkcircleo"
          size={commonStyles.iconSize.xl}
          color={commonStyles.iconColor.darkRed}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelContainer}
        onPress={() => setIsAddingNewTheft(false)}>
        <Check
          name="closecircleo"
          size={commonStyles.iconSize.xl}
          color={commonStyles.iconColor.darkRed}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 10,
    paddingHorizontal: 5,
    maxWidth: '75%',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  infoText: {textAlign: 'center'},
  crosshairContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  checkContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    bottom: 0,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  cancelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    bottom: 0,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
