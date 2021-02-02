import React from 'react';
import {Button, Text, View, StyleSheet, Pressable} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useMutation} from '@apollo/client';
import {CREATE_THEFT, GET_THEFTS} from '../../Utils/gql';
import {Formik} from 'formik';
import Modal from 'react-native-modal';
import FormCarousel from './FormCarousel';
import {useToggleIsAddingNewTheft} from '../../ContextProviders/IsAddingNewTheftContext';
import CloseButton from 'react-native-vector-icons/FontAwesome';

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
    // console.log(currentToken.idToken);
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
              <View style={styles.closeButton}>
                <CloseButton name="close" onPress={cancelAdding} size={25} />
              </View>

              <FormCarousel
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                setFieldValue={setFieldValue}
              />
              <View>
                <Pressable onPress={handleSubmit}>
                  <Button title={'yes'} />
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 15,
    padding: 5,
  },
  form: {flex: 1, justifyContent: 'space-around'},
  header: {fontSize: 20, textAlign: 'center'},
  closeButton: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
