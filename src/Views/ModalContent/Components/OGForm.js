import React from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import styles from './modalStyles';
import DatePicker from './Components/DatePicker';
import {CREATE_THEFT, GET_THEFTS} from '../../Utils/gql';
import {useToggleIsAddingNewTheft} from '../../ContextProviders/IsAddingNewTheftContext';

const FormModal = ({
  isFormModalVisible,
  selectedRegion,
  setIsFormModalVisible,
}) => {
  const {longitude, latitude} = selectedRegion;
  const [submitCreateMutation, {error: create_error}] = useMutation(
    CREATE_THEFT,

    {
      refetchQueries: [{query: GET_THEFTS}],
      onCompleted: (data) => console.log(data),
    },
  );

  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  function submitTheft(values) {
    console.log(values.date);
    submitCreateMutation({
      variables: {
        input: {
          bike_description: values.bike_description,
          comments: values.comments,
          date: values.date,
          region: {latitude, longitude},
          created_at: new Date(),
        },
      },
    });
    setIsFormModalVisible(false);
    setIsAddingNewTheft(false);
  }

  create_error && console.log(create_error);

  function cancelAdding() {
    setIsFormModalVisible(false);
    setIsAddingNewTheft(false);
  }

  return (
    <Modal isVisible={isFormModalVisible}>
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
            <View style={styles.form}>
              <Text style={styles.header}>Report New Theft</Text>
              <View>
                <TextInput
                  style={styles.textArea}
                  onChangeText={handleChange('bike_description')}
                  onBlur={handleBlur('bike_description')}
                  value={values.bike_description}
                  multiline={true}
                  numberOfLines={4}
                  scrollEnabled={true}
                  placeholder={'Describe your bike here'}
                />
                <TextInput
                  style={styles.textArea}
                  onChangeText={handleChange('comments')}
                  onBlur={handleBlur('comments')}
                  value={values.comments}
                  numberOfLines={4}
                  placeholder={'Add other comments here'}
                />
                {values.date && (
                  <View>
                    <Text>Selected date:</Text>
                    <Text>{values.date.toString()}</Text>
                  </View>
                )}
                <DatePicker setFieldValue={setFieldValue} />
              </View>
              <View>
                <Button title="Submit" onPress={handleSubmit} />
                <Button title="Cancel" onPress={cancelAdding} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default FormModal;
