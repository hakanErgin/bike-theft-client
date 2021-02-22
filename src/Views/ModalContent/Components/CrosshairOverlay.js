import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
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
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View style={styles.topInfoContainer}>
        <Text style={styles.topInfoText}>
          Choose where your bike was stolen using the indicator at the center of
          the screen.
        </Text>
      </View>
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.bottomButtons}
          onPress={() => confirmLocation()}>
          <Check name="checkcircleo" style={styles.buttonFont} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButtons}
          onPress={() => setIsAddingNewTheft(false)}>
          <Cancel name="closecircleo" style={styles.buttonFont} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topInfoContainer: {
    padding: commonStyles.gap[1],
    marginHorizontal: commonStyles.gap[3],
    borderRadius: commonStyles.borderRadius.small,
    backgroundColor: commonStyles.containerBackgroundColor.light,
    elevation: 1,
  },
  topInfoText: {textAlign: 'center'},
  buttonFont: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtons: {
    borderRadius: commonStyles.borderRadius.small,
    backgroundColor: commonStyles.containerBackgroundColor.light,
    padding: commonStyles.gap[1],
  },
});
