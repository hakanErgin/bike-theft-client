import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import BackButton from 'react-native-vector-icons/Ionicons';
import FlashMessage from 'react-native-flash-message';
import commonStyles, {inputAndroid} from '../../Utils/commonStyles';
import RNPickerSelect from 'react-native-picker-select';

export default function FeedbackModal({navigation}) {
  return (
    <View style={styles.modal}>
      <Formik
        validateOnChange={false}
        initialValues={{
          feedback_type: 'Not Specified',
          feedback: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({handleChange, values, handleSubmit, setFieldValue}) => (
          <View style={styles.form}>
            <Text style={styles.header}>Feedback</Text>
            <TouchableOpacity
              style={styles.backButtonContainer}
              onPress={() => navigation.goBack()}>
              <BackButton name="arrow-back" style={styles.backButton} />
            </TouchableOpacity>
            <View>
              <Text style={{}}>Please choose type of feedback</Text>
              <Text style={styles.requiredText}>*required</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => setFieldValue('feedback_type', value)}
                style={styles}
                items={[
                  {
                    label: 'Bug Report',
                    value: 'Bug Report',
                  },
                  {
                    label: 'Feedback',
                    value: 'Feedback',
                  },
                  {
                    label: 'Suggestion',
                    value: 'Suggestion',
                  },
                ]}
              />
            </View>
            <View>
              <Text>Anything else you like to add</Text>
              <TextInput
                style={styles.textArea}
                onChangeText={handleChange('feedback')}
                value={values.feedback}
                numberOfLines={4}
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
    borderRadius: commonStyles.borderRadius.large,
    padding: commonStyles.gap[3],
  },
  form: {flex: 1, justifyContent: 'space-between'},
  header: {fontSize: commonStyles.fontSize.xl, textAlign: 'center'},
  backButtonContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
  },
  backButton: {
    fontSize: commonStyles.iconSize.large,
  },
  requiredText: {
    fontSize: commonStyles.fontSize.small,
    color: 'black',
    fontStyle: 'italic',
    position: 'absolute',
    right: 0,
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: commonStyles.borderRadius.normal,
    textAlignVertical: 'top',
    paddingBottom: commonStyles.gap[3],
    marginBottom: commonStyles.gap[3],
    width: '100%',
  },
});
