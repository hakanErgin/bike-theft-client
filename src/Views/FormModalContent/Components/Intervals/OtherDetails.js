import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import commonStyles from '../../../../Utils/commonStyles';

export const OtherDetails = ({handleChange, values}) => {
  return (
    <View style={styles.slide}>
      <Text>Anything else you like to add..</Text>
      <TextInput
        multiline={true}
        style={styles.textArea}
        onChangeText={handleChange('comments')}
        value={values.comments}
        numberOfLines={8}
        placeholder="Comments"
      />
    </View>
  );
};

export default OtherDetails;

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: commonStyles.containerBackgroundColor.lightGray,
    borderRadius: commonStyles.borderRadius.normal,
    textAlignVertical: 'top',
    paddingBottom: commonStyles.gap[3],
    marginBottom: commonStyles.gap[3],
    width: '100%',
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
});
