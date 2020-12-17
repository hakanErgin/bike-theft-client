import React, {useState} from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';
// import DatePicker from './DatePicker';
import {Formik} from 'formik';
import {useMutation, gql} from '@apollo/client';
import DatePicker from './DatePicker';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    textAlignVertical: 'top',
  },
  modal: {
    flex: 0.75,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 20,
  },
});

const CREATE_THEFT = gql`
  mutation($input: CreateTheftInput!) {
    # mutation($lat: Float!, $lng: Float!) {
    createTheft(input: $input) {
      _id
    }
  }
`;

export default function TheftForm({cancelAdding, selectedRegion}) {
  const {longitude, latitude} = selectedRegion;
  const [submitMutation, {data, error}] = useMutation(CREATE_THEFT);

  error && console.log(error);
  function submitTheft(values) {
    console.log(values);
    submitMutation({
      variables: {input: {region: {latitude, longitude}}},
    });
  }

  return (
    <View style={styles.modal}>
      <Formik
        initialValues={{bike_description: '', comments: '', date: undefined}}
        onSubmit={submitTheft}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <View>
            <Text>Selected coords:</Text>
            <Text>longitude:{longitude}</Text>
            <Text>latitude:{latitude}</Text>
            <TextInput
              style={styles.textArea}
              onChangeText={handleChange('bike_description')}
              onBlur={handleBlur('bike_description')}
              value={values.bike_description}
              multiline={true}
              numberOfLines={3}
              scrollEnabled={true}
              placeholder={'bike_description'}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('comments')}
              onBlur={handleBlur('comments')}
              value={values.comments}
              placeholder={'comments'}
            />
            {values.date && (
              <View>
                <Text>Selected date:</Text>
                <Text>{values.date.toString()}</Text>
              </View>
            )}
            <DatePicker setFieldValue={setFieldValue} />
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={cancelAdding} />
          </View>
        )}
      </Formik>
    </View>
  );
}
