import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function CrosshairOverlay() {
  return <Text style={styles.crosshair}>+</Text>;
}

const styles = StyleSheet.create({
  crosshair: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 50,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
