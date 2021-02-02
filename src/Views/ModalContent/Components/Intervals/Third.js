import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DatePicker from '../DatePicker';
import commonStyles from '../../../../Utils/commonStyles';

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

const {slide} = commonStyles;
const styles = StyleSheet.create({
  slide: {...slide},
});
