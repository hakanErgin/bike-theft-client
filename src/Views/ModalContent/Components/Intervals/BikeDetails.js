import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import commonStyles from '../../../../Utils/commonStyles';
import ImagePickerComponent from '../ImagePicker';

export const BikeDetails = ({handleChange, handleBlur, values}) => {
  return (
    <View style={styles.slide}>
      <TextInput
        style={styles.textArea}
        onChangeText={handleChange('bike_description')}
        onBlur={handleBlur('bike_description')}
        value={values.bike_description}
        multiline={true}
        numberOfLines={4}
        scrollEnabled={true}
        placeholder={'Describe your bike here'}
      />
      <ImagePickerComponent />
    </View>
  );
};

export default BikeDetails;

const {slide, textArea} = commonStyles;
const styles = StyleSheet.create({
  textArea: {
    ...textArea,
  },
  slide: {...slide},
});
