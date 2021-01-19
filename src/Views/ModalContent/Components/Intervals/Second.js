import React from 'react';
import {View, TextInput} from 'react-native';
import styles from '../../modalStyles';

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
