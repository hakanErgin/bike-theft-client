import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DatePicker from '../DatePicker';
import commonStyles from '../../../../Utils/commonStyles';
import RNPickerSelect from 'react-native-picker-select';

export const DateDetails = ({setFieldValue, values}) => {
  return (
    <View style={styles.slide}>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        onValueChange={(value) => console.log(value)}
        style={styles}
        items={[
          {
            label: 'Football',
            value: 'football',
          },
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      />
      {values.date && (
        <View>
          <Text>{values.date.toDateString()}</Text>
        </View>
      )}
      <DatePicker setFieldValue={setFieldValue} />
    </View>
  );
};

export default DateDetails;

const {slide, textArea, inputAndroid} = commonStyles;
const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  inputAndroid: {
    ...inputAndroid,
  },
});
