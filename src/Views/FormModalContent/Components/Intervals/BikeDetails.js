import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import commonStyles, {inputAndroid} from '../../../../Utils/commonStyles';
import theftFields from '../../../../Utils/theftFields';
import {NormalText} from '../../../../Utils/commonComponents';
import RNPickerSelect from 'react-native-picker-select';

export function BikeInputFields({setFieldValue}) {
  return theftFields.bike.map((field) => {
    // theres only 1 elem/key in each object
    const fieldType = Object.keys(field)[0];

    return (
      <View style={styles.field} key={fieldType}>
        <NormalText>{field[fieldType].Question}</NormalText>
        {field[fieldType].required && (
          <NormalText style={styles.requiredText}>*required</NormalText>
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
              value: option,
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

const styles = StyleSheet.create({
  field: {marginBottom: commonStyles.gap[5]},
  inputAndroid: {
    ...inputAndroid,
  },
  slide: {
    paddingHorizontal: commonStyles.gap[5],
    paddingBottom: commonStyles.gap[3],
    paddingTop: commonStyles.gap[6],
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
  requiredText: {
    fontSize: commonStyles.fontSize.tiny,
    color: 'black',
    fontStyle: 'italic',
    position: 'absolute',
    right: 0,
  },
});
