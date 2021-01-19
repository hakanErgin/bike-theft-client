import React from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import styles from './modalStyles';
import DatePicker from './Components/DatePicker';
import {CREATE_THEFT, GET_THEFTS} from '../../Utils/gql';
import {useToggleIsAddingNewTheft} from '../../ContextProviders/IsAddingNewTheftContext';
import Carousel from './Carousel';

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
        <Carousel
          style="slide"
          items={[
            {
              title: 'Welcome, swipe to continue.',
            },
            {
              title: 'About feature X.',
            },
            {
              title: 'About feature Y.',
            },
          ]}
        />

        <View>
          <Button title="Cancel" onPress={cancelAdding} />
        </View>
      </View>
    </Modal>
  );
};

export default FormModal;
