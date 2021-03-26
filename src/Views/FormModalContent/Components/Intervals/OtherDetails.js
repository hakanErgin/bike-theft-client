import React from 'react';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';
import commonStyles, {inputAndroid} from '../../../../Utils/commonStyles';
import {NormalText} from '../../../../Utils/commonComponents';
import CheckBox from '@react-native-community/checkbox';

export const OtherDetails = ({
  handleChange,
  values,
  isSharingContact,
  setIsSharingContact,
}) => {
  return (
    <View style={styles.slide}>
      <ScrollView contentContainerStyle={styles.scrollableContainer}>
        <View style={styles.otherDetailsContainer}>
          <NormalText>Anything else you like to add..</NormalText>
          <TextInput
            multiline={true}
            style={styles.textArea}
            onChangeText={handleChange('other_details.comments')}
            value={values.other_details.comments}
            numberOfLines={6}
            placeholder="Comments"
          />
        </View>
        <View>
          <View style={styles.checkBoxContainer}>
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
            <NormalText>I want to share my contact information</NormalText>
          </View>
          {isSharingContact && (
            <View>
              <NormalText>
                If my bicycle is seen, I want to be contacted by:
              </NormalText>
              <TextInput
                style={styles.contact}
                onChangeText={handleChange('other_details.contact')}
                value={values.other_details.contact}
                placeholder="Email or phone"
              />
              <NormalText style={styles.noticeText}>
                Notice: Contact information is deleted either automatically
                after 90 days or when you archive the report or mark as found.
              </NormalText>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  otherDetailsContainer: {width: '100%'},
  textArea: {
    borderWidth: 1,
    borderColor: commonStyles.containerBackgroundColor.lightGray,
    borderRadius: commonStyles.borderRadius.normal,
    textAlignVertical: 'top',
    paddingBottom: commonStyles.gap[3],
    marginBottom: commonStyles.gap[3],
    width: '100%',
  },
  scrollableContainer: {justifyContent: 'space-around'},
  noticeText: {marginTop: commonStyles.gap[2]},
  contact: {
    borderWidth: 1,
    borderColor: commonStyles.containerBackgroundColor.lightGray,
    borderRadius: commonStyles.borderRadius.normal,
    padding: commonStyles.gap[1],
    marginVertical: commonStyles.gap[0],
  },
  inputAndroid: {
    ...inputAndroid,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: commonStyles.gap[3],
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
