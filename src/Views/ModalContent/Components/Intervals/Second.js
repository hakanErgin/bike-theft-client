import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import commonStyles from '../../../../Utils/commonStyles';

export const SecondInterval = ({handleChange, handleBlur, values}) => {
  return (
    <View style={styles.slide}>
      <TextInput
        style={styles.textArea}
        onChangeText={handleChange('comments')}
        onBlur={handleBlur('comments')}
        value={values.comments}
        numberOfLines={4}
        placeholder={'Add other comments here'}
      />
    </View>
  );
};

export default SecondInterval;

const {slide, textArea} = commonStyles;
const styles = StyleSheet.create({
  textArea: {
    ...textArea,
  },
  slide: {...slide},
});
