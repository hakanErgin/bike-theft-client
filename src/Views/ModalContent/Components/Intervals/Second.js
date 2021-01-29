import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

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
