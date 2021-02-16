import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import commonStyles from '../../../../Utils/commonStyles';

export const OtherDetails = ({handleChange, values}) => {
  return (
    <View style={styles.slide}>
      <Text>Anything else you like to add</Text>
      <TextInput
        style={styles.textArea}
        onChangeText={handleChange('comments')}
        value={values.comments}
        numberOfLines={4}
        placeholder={'Comments'}
      />
    </View>
  );
};

export default OtherDetails;

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: commonStyles.borderRadius.normal,
    textAlignVertical: 'top',
    paddingBottom: commonStyles.gap[2],
    marginBottom: commonStyles.gap[2],
    width: '100%',
  },
  slide: {
    paddingHorizontal: commonStyles.gap[4],
    paddingBottom: commonStyles.gap[2],
    paddingTop: commonStyles.gap[5],
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
