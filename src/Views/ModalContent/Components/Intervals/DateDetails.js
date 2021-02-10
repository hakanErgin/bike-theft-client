import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DatePicker from '../DatePicker';
import commonStyles from '../../../../Utils/commonStyles';
import RNPickerSelect from 'react-native-picker-select';
import theftFields from '../../../../Utils/theftFields';
export const DateDetails = ({setFieldValue, values}) => {
  const timeOfDayChange = (dateParam, setFieldValueParam) => {
    setFieldValueParam('date_details.time', dateParam);
  };

  return (
    <View style={styles.slide}>
      <View>
        <Text style={{}}>{theftFields.date_time.date.Question}</Text>
        <DatePicker setFieldValue={setFieldValue} values={values} />
      </View>
      <View>
        <Text style={{}}>{theftFields.date_time.time.Question}</Text>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => timeOfDayChange(value, setFieldValue)}
          style={styles}
          items={theftFields.date_time.time.Options.map((option) => {
            return {label: option, value: option.toLowerCase()};
          })}
        />
      </View>
    </View>
  );
};

export default DateDetails;

const {inputAndroid} = commonStyles;
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
