import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import commonStyles from '../../../../Utils/commonStyles';
import {NormalText} from '../../../../Utils/commonComponents';
import CheckBox from '@react-native-community/checkbox';

export const OtherDetails = ({handleChange, values}) => {
  const [isSharingContact, setIsSharingContact] = useState(false);
  return (
    <View style={styles.slide}>
      <NormalText>Anything else you like to add..</NormalText>
      <TextInput
        multiline={true}
        style={styles.textArea}
        onChangeText={handleChange('comments')}
        value={values.comments}
        numberOfLines={8}
        placeholder="Comments"
      />
      <View style={styles.contactInformation}>
        <CheckBox
          tintColors={{
            true: commonStyles.iconColor.darkRed,
            false: commonStyles.iconColor.lightGrey,
          }}
          value={isSharingContact}
          onValueChange={(value) => {
            setIsSharingContact(value);
          }}
        />

        <NormalText style={styles.ebikeText}>
          I want to share my contact information
        </NormalText>
      </View>
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
  contactInformation: {flexDirection: 'row', alignItems: 'center'},
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
