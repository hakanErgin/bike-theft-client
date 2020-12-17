import React, {useState} from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';
// import DatePicker from './DatePicker';
import {Formik} from 'formik';
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

export default function TheftForm({cancelAdding}) {
  return (
    <View style={styles.modal}>
      <Formik
        initialValues={{bike_description: '', comments: '', date: undefined}}
        onSubmit={(values) => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <View>
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
            {values.date && <Text>{values.date.toString()}</Text>}
            <DatePicker setFieldValue={setFieldValue} />
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={cancelAdding} />
          </View>
        )}
      </Formik>
    </View>
  );
}
