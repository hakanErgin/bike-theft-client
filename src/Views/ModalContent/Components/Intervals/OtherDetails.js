import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import commonStyles from '../../../../Utils/commonStyles';

export const OtherDetails = ({handleChange, values}) => {
  return (
    <View style={styles.slide}>
      <TextInput
        style={styles.textArea}
        onChangeText={handleChange('comments')}
        value={values.comments}
        numberOfLines={4}
        placeholder={'Add other comments here'}
      />
    </View>
  );
};

export default OtherDetails;

const {slide, textArea, inputAndroid} = commonStyles;
const styles = StyleSheet.create({
  textArea: {
    ...textArea,
  },
  slide: {...slide},
  inputAndroid: {
    ...inputAndroid,
  },
});
