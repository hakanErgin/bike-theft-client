import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DatePicker from '../DatePicker';
import commonStyles, {inputAndroid} from '../../../../Utils/commonStyles';
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

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: commonStyles.gap[4],
    paddingBottom: commonStyles.gap[2],
    paddingTop: commonStyles.gap[5],
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
  inputAndroid: {
    ...inputAndroid,
  },
});
