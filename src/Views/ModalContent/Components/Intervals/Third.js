import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../modalStyles';
import DatePicker from '../DatePicker';

export const ThirdInterval = ({setFieldValue, values}) => {
  return (
    <View style={styles.slide}>
      <View>
        {values.date && (
          <View>
            <Text>Selected date:</Text>
            <Text>{values.date.toString()}</Text>
          </View>
        )}
        <DatePicker setFieldValue={setFieldValue} />
      </View>
    </View>
  );
};

export default ThirdInterval;
