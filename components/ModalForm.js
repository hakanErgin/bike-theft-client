import React from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import DatePicker from './DatePicker';
import styles from '../shared/styles';
import {CREATE_THEFT, GET_THEFTS} from '../shared/gql';

const ModalForm = ({
  isModalVisible,
  selectedRegion,
  setIsModalVisible,
  setIsAddingNewTheft,
}) => {
  const {longitude, latitude} = selectedRegion;
  const [submitCreateMutation, {error: create_error}] = useMutation(
    CREATE_THEFT,
    {
      refetchQueries: [{query: GET_THEFTS}],
    },
  );

  function submitTheft(values) {
    // console.log(values);
    submitCreateMutation({
      variables: {input: {region: {latitude, longitude}}},
    });
    setIsModalVisible(false);
    setIsAddingNewTheft(false);
  }

  create_error && console.log(create_error);

  function cancelAdding() {
    setIsModalVisible(false);
    setIsAddingNewTheft(false);
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

export default ModalForm;
