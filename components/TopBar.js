import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TopBar = ({nr}) => {
  const getColor = () => {
    if (nr <= 3 && nr > 0) {
      return 'yellow';
    }
    if (nr > 3) {
      return 'red';
    }
    return 'green';
  };
  return (
    <View style={styles.container}>
      <Text>{`${nr} theft${nr > 1 ? 's' : ''} in this area`}</Text>
      <View style={[styles.trafficLight, {backgroundColor: getColor()}]} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingBottom: 22,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  trafficLight: {
    borderRadius: 10,
    backgroundColor: 'red',
    zIndex: 10,
    marginLeft: 8,
    width: 20,
    height: 20,
  },
});
export default TopBar;
