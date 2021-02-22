import React from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import {Formik} from 'formik';
import CloseButton from 'react-native-vector-icons/MaterialIcons';
import FlashMessage from 'react-native-flash-message';
import commonStyles, {inputAndroid} from '../../Utils/commonStyles';
import RNPickerSelect from 'react-native-picker-select';

export default function FeedbackModal({navigation}) {
  return (
    <View style={styles.modal}>
      <Formik validateOnChange={false} initialValues={{}} onSubmit={{}}>
        {({handleChange, values, handleSubmit, setFieldValue}) => (
          <View style={styles.form}>
            <Text style={styles.header}>Feedback</Text>
            <View style={styles.closeButtonContainer}>
              <CloseButton
                name="close"
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.field}>
              <Text style={{}}>Please choose type of feedback</Text>
              <Text style={styles.requiredText}>*required</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => setFieldValue('feedback', value)}
                style={styles}
                items={[
                  {
                    label: 'option',
                    value: 'option',
                  },
                ]}
              />
            </View>
            <View>
              <Pressable>
                <Button title={'Sumbit'} onPress={handleSubmit} />
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputAndroid: {
    ...inputAndroid,
  },
  modal: {
    flex: 1,
    backgroundColor: commonStyles.containerBackgroundColor.light,
    justifyContent: 'space-between',
    borderRadius: commonStyles.borderRadius.large,
    padding: commonStyles.gap[3],
  },
  form: {flex: 1, justifyContent: 'space-around'},
  header: {fontSize: commonStyles.fontSize.xl, textAlign: 'center'},
  closeButtonContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeButton: {
    fontSize: commonStyles.iconSize.large,
  },
  requiredText: {
    fontSize: commonStyles.fontSize.small,
    color: 'black',
    fontStyle: 'italic',
    position: 'absolute',
    right: 0,
  },
});
