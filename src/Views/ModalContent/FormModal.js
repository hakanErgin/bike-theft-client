import React, {useState, useEffect} from 'react';
import {Button, Text, View, StyleSheet, Pressable} from 'react-native';
import {useMutation} from '@apollo/client';
import {
  CREATE_THEFT,
  GET_THEFTS,
  SINGLE_FILE_UPLOAD,
  MULTI_FILE_UPLOAD,
  GET_USERS_THEFTS,
} from '../../Utils/gql';
import {Formik} from 'formik';
import Modal from 'react-native-modal';
import FormCarousel from './FormCarousel';
import {useToggleIsAddingNewTheft} from '../../ContextProviders/IsAddingNewTheftContext';
import CloseButton from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../Utils/commonStyles';
import {mediaClient} from '../../ContextProviders/CombinedProviders';
import {GoogleSignin} from '@react-native-community/google-signin';

import {BikeDetails} from './Components/Intervals/BikeDetails';
import {OtherDetails} from './Components/Intervals/OtherDetails';
import {DateDetails} from './Components/Intervals/DateDetails';
import ImagePickerComponent from './Components/ImagePicker';
import {BikeInputFields} from './Components/Intervals/BikeDetails';
import {
  submitForm,
  initialValues,
  validate,
  showValidationWarning,
} from '../../Utils/formUtils';
import FlashMessage from 'react-native-flash-message';

const FormModal = ({
  isFormModalVisible,
  selectedRegion,
  setIsFormModalVisible,
}) => {
  const [pickedImages, setPickedImages] = useState([]);
  // can use this to print location fetched from coords
  // const {longitude, latitude} = selectedRegion;
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();
  // const [token, setToken] = useState();

  //#region mutation/query
  const [submitCreateMutation, {error: create_error}] = useMutation(
    CREATE_THEFT,
    {
      refetchQueries: [
        {query: GET_THEFTS},
        // {
        //   query: GET_USERS_THEFTS,
        //   variables: {id_token: token && token},
        // },
      ],
      onCompleted: () => finishAddingTheft(),
    },
  );
  const [singleUpload] = useMutation(SINGLE_FILE_UPLOAD, {
    client: mediaClient,
  });
  const [multiUpload] = useMutation(MULTI_FILE_UPLOAD, {
    client: mediaClient,
  });

  // useEffect(() => {
  //   (async function () {
  //     GoogleSignin.getTokens().then((result) => {
  //       console.log(result);
  //       setToken(result.idToken);
  //     });
  //   })();
  // }, []);

  // #endregion

  function finishAddingTheft() {
    setIsFormModalVisible(false);
    setIsAddingNewTheft(false);
  }

  create_error && console.log(create_error);

  return (
    <Modal isVisible={isFormModalVisible}>
      <View style={styles.modal}>
        <Formik
          validate={validate}
          initialValues={initialValues}
          onSubmit={(values) =>
            submitForm(
              values,
              pickedImages,
              singleUpload,
              multiUpload,
              submitCreateMutation,
              selectedRegion,
              setIsFormModalVisible,
              setIsAddingNewTheft,
            )
          }>
          {({handleChange, values, handleSubmit, setFieldValue}) => (
            <View style={styles.form}>
              <Text style={styles.header}>Report a theft</Text>
              <View style={styles.closeButtonContainer}>
                <CloseButton
                  name="close"
                  onPress={finishAddingTheft}
                  style={styles.closeButton}
                />
              </View>
              <FormCarousel>
                <DateDetails values={values} setFieldValue={setFieldValue} />
                <BikeDetails>
                  <ImagePickerComponent
                    pickedImages={pickedImages}
                    setPickedImages={setPickedImages}
                  />
                  <BikeInputFields setFieldValue={setFieldValue} />
                </BikeDetails>
                <OtherDetails handleChange={handleChange} values={values} />
              </FormCarousel>
              <View>
                <Pressable>
                  <Button title={'yes'} onPress={handleSubmit} />
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
      <FlashMessage position="top" />
    </Modal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: commonStyles.containerBackgroundColor.light,
    justifyContent: 'space-between',
    borderRadius: commonStyles.borderRadius.large,
    padding: commonStyles.gap[0],
  },
  form: {flex: 1, justifyContent: 'space-around'},
  header: {fontSize: commonStyles.fontSize.large, textAlign: 'center'},
  closeButtonContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeButton: {
    fontSize: commonStyles.iconSize.large,
    margin: commonStyles.gap[0],
  },
});
