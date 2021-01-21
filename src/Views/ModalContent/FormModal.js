import React from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import styles from './modalStyles';
import {CREATE_THEFT, GET_THEFTS} from '../../Utils/gql';
import {useToggleIsAddingNewTheft} from '../../ContextProviders/IsAddingNewTheftContext';
import FormCarousel from './FormCarousel';
import {GoogleSignin} from '@react-native-community/google-signin';

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

  async function submitTheft(values) {
    const currentToken = await GoogleSignin.getTokens();
    console.log(currentToken.idToken);
    // const deletedToken = await GoogleSignin.clearCachedAccessToken(
    //   currentToken.idToken,
    // );
    // console.log({deletedToken});
    // const newToken = await GoogleSignin.getTokens();
    // console.log(newToken.idToken);

    submitCreateMutation({
      variables: {
        input: {
          bike_description: values.bike_description,
          comments: values.comments,
          date: values.date,
          region: {latitude, longitude},
          created_at: new Date(),
        },
        id_token: currentToken.idToken,
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
            values,
            handleSubmit,
            setFieldValue,
          }) => (
            <View style={styles.form}>
              <Text style={styles.header}>Report New Theft</Text>
              <FormCarousel
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                setFieldValue={setFieldValue}
              />
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
