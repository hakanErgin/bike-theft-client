import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import BackButton from 'react-native-vector-icons/Ionicons';
import commonStyles, {inputAndroid} from '../Utils/commonStyles';
import RNPickerSelect from 'react-native-picker-select';
import {CREATE_FEEDBACK} from '../Utils/gql';
import {LoadingView} from '../Utils/commonComponents';

export default function FeedbackForm({navigation}) {
  const [areFieldsSet, setAreFieldsSet] = useState(false);
  const [submitCreateMutation, {loading: create_loading}] = useMutation(
    CREATE_FEEDBACK,
    {
      onCompleted: (res) => {
        // console.log(res);
        navigateBack();
      },
    },
  );
  function navigateBack() {
    navigation.goBack();
  }

  function submitFeedback(values) {
    submitCreateMutation({
      variables: {type: values.feedback_type, description: values.feedback},
    });
  }

  function validate(values) {
    const errors = {};
    if (!values.feedback) {
      errors.feedback = 'Feedback';
    }
    if (!values.feedback_type) {
      errors.feedback_type = 'Feedback type';
    }
    if (errors.feedback || errors.feedback_type) {
      setAreFieldsSet(false);
    } else {
      setAreFieldsSet(true);
    }
    return errors;
  }

  if (create_loading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.modal}>
      <Formik
        validate={validate}
        initialValues={{
          feedback_type: undefined,
          feedback: undefined,
        }}
        onSubmit={submitFeedback}>
        {({handleChange, values, handleSubmit, setFieldValue}) => (
          <View style={styles.form}>
            <Text style={styles.header}>Feedback</Text>
            <TouchableOpacity
              style={styles.backButtonContainer}
              onPress={navigateBack}>
              <BackButton name="arrow-back" style={styles.backButton} />
            </TouchableOpacity>
            <View>
              <Text style={{}}>Choose type of feedback</Text>
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
              <Text>Your anonymous feedback</Text>
              <Text style={styles.requiredText}>*required</Text>
              <TextInput
                style={styles.textArea}
                onChangeText={handleChange('feedback')}
                value={values.feedback}
                numberOfLines={4}
                placeholder={'Fill here'}
              />
            </View>
            <View>
              <Pressable>
                <Button
                  title={'Sumbit'}
                  onPress={handleSubmit}
                  disabled={!areFieldsSet}
                />
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
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
    borderColor: commonStyles.containerBackgroundColor.lightGray,
    borderRadius: commonStyles.borderRadius.normal,
    textAlignVertical: 'top',
    paddingBottom: commonStyles.gap[3],
    marginBottom: commonStyles.gap[3],
    width: '100%',
  },
});
