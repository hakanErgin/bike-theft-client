import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import commonStyles from '../../../../Utils/commonStyles';
import theftFields from '../../../../Utils/theftFields';
import RNPickerSelect from 'react-native-picker-select';

export function BikeInputFields({setFieldValue}) {
  return theftFields.bike.map((field) => {
    // theres only 1 elem/key in each object
    const fieldType = Object.keys(field)[0];

    return (
      <View style={styles.field} key={fieldType}>
        <Text style={{}}>{field[fieldType].Question}</Text>
        {field[fieldType].required && (
          <Text style={styles.requiredText}>*required</Text>
        )}
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) =>
            setFieldValue(`bike_details.${fieldType}`, value)
          }
          style={styles}
          items={field[fieldType].Options.map((option) => {
            option = typeof option === 'string' ? option : option.toString();
            return {
              label: option,
              value: option.toLowerCase(),
            };
          })}
        />
      </View>
    );
  });
}

export const BikeDetails = ({children}) => {
  return (
    <View style={styles.slide}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default BikeDetails;

const {slide, inputAndroid} = commonStyles;
const styles = StyleSheet.create({
  field: {marginBottom: 20},
  inputAndroid: {
    ...inputAndroid,
  },
  slide: {...slide},
  requiredText: {
    fontSize: 10,
    color: 'black',
    fontStyle: 'italic',
    position: 'absolute',
    right: 0,
  },
});
