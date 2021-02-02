import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingBottom: 10,
    marginBottom: 10,
    width: '100%',
  },
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
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
});
