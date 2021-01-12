import React from 'react';
import {View, Text} from 'react-native';
import styles from '../shared/styles';

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
    <View style={styles.topBarContainer}>
      <Text>{`${nr} theft${nr > 1 ? 's' : ''} in this area`}</Text>
      <View style={[styles.trafficLight, {backgroundColor: getColor()}]} />
    </View>
  );
};

export default TopBar;
