import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import commonStyles, {inputAndroid} from '../../../../Utils/commonStyles';
import theftFields from '../../../../Utils/theftFields';
import {NormalText} from '../../../../Utils/commonComponents';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';

function BikeInputField({field, setFieldValue, fieldType, values}) {
  const fieldIsBikeType = fieldType === 'type';

  return (
    <View
      style={[styles.field, fieldIsBikeType && styles.bikeTypeFieldContainer]}>
      <View style={styles.typeField}>
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
      {fieldIsBikeType && (
        <View style={styles.checkBoxContainer}>
          <NormalText>e-bike</NormalText>
          <CheckBox
            tintColors={{
              false: commonStyles.iconColor.lightGrey,
            }}
            value={values.bike_details.ebike}
            onValueChange={(value) =>
              setFieldValue('bike_details.ebike', value)
            }
            style={styles.checkBox}
          />
        </View>
      )}
    </View>
  );
}

export function BikeInputFields({setFieldValue, values}) {
  return theftFields.bike.map((field) => {
    const fieldType = Object.keys(field)[0]; // theres only 1 elem/key in each object
    return (
      <BikeInputField
        field={field}
        setFieldValue={setFieldValue}
        key={fieldType}
        fieldType={fieldType}
        values={values}
      />
    );
  });
}

// main component for bike details
export const BikeDetails = ({children}) => {
  return (
    <View style={styles.slide}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {marginBottom: commonStyles.gap[5]},
  bikeTypeFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeField: {flex: 5},
  checkBoxContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  inputAndroid: {
    ...inputAndroid,
  },
  checkBox: {flexGrow: 1},
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
