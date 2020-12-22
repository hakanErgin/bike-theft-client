import React from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import DatePicker from './DatePicker';
import styles from '../shared/styles';
import {CREATE_THEFT} from '../shared/gql';

const FormModal = ({
  isModalVisible,
  selectedRegion,
  setIsModalVisible,
  setIsAddingNewTheft,
}) => {
  const {longitude, latitude} = selectedRegion;
  const [submitCreateMutation, {data, error}] = useMutation(CREATE_THEFT);

  function submitTheft(values) {
    // console.log(values);
    submitCreateMutation({
      variables: {input: {region: {latitude, longitude}}},
    });
    setIsModalVisible(false);
    setIsAddingNewTheft(false);
  }

  error && console.log(error);
  data && console.log(data);

  function cancelAdding() {
    setIsModalVisible(false);
    setIsAddingNewTheft(false);
    // const tempState = thefts;
    // tempState.pop();
    // setThefts(tempState);
  }

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modal}>
        <Formik
          initialValues={{bike_description: '', comments: '', date: undefined}}
          onSubmit={submitTheft}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
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
    </Modal>
  );
};

export default FormModal;
