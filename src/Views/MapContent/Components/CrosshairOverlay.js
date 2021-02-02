import React from 'react';
import {StyleSheet, View} from 'react-native';
import Crosshair from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from '../../../Utils/commonStyles';

export default function CrosshairOverlay() {
  return (
    <View style={styles.crosshairContainer}>
      <Crosshair
        name="crosshairs"
        size={commonStyles.iconSize.xl}
        color={commonStyles.iconColor.darkRed}
      />
    </View>
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
});
