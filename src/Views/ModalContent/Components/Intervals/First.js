import React from 'react';
import {View, TextInput} from 'react-native';
import styles from '../../modalStyles';

export const FirstInterval = ({handleChange, handleBlur, values}) => {
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
    </View>
  );
};

export default FirstInterval;
