import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
