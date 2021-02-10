import React, {useState} from 'react';
import {Button, Text, View, StyleSheet, Pressable} from 'react-native';
import {useMutation} from '@apollo/client';
import {
  CREATE_THEFT,
  GET_THEFTS,
  SINGLE_FILE_UPLOAD,
  MULTI_FILE_UPLOAD,
} from '../../Utils/gql';
import {Formik} from 'formik';
import Modal from 'react-native-modal';
import FormCarousel from './FormCarousel';
import {useToggleIsAddingNewTheft} from '../../ContextProviders/IsAddingNewTheftContext';
import CloseButton from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../Utils/commonStyles';
import {mediaClient} from '../../ContextProviders/CombinedProviders';

import {BikeDetails} from './Components/Intervals/BikeDetails';
import {OtherDetails} from './Components/Intervals/OtherDetails';
import {DateDetails} from './Components/Intervals/DateDetails';
import ImagePickerComponent from './Components/ImagePicker';
import {BikeInputFields} from './Components/Intervals/BikeDetails';
import {submitForm, initialValues, validate} from '../../Utils/formUtils';

const FormModal = ({
  isFormModalVisible,
  selectedRegion,
  setIsFormModalVisible,
}) => {
  const [pickedImages, setPickedImages] = useState([]);
  // can use this to print location fetched from coords
  // const {longitude, latitude} = selectedRegion;
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  //#region mutation/query
  const [submitCreateMutation, {error: create_error}] = useMutation(
    CREATE_THEFT,
    {
      refetchQueries: [{query: GET_THEFTS}],
      onCompleted: (craeteTheftData) => console.log(craeteTheftData),
    },
  );
  const [singleUpload] = useMutation(SINGLE_FILE_UPLOAD, {
    client: mediaClient,
  });
  const [multiUpload] = useMutation(MULTI_FILE_UPLOAD, {
    client: mediaClient,
  });
  // #endregion

  function cancelAdding() {
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
          {({handleChange, values, handleSubmit, setFieldValue, errors}) => (
            <View style={styles.form}>
              <Text style={styles.header}>Report a theft</Text>
              <View style={styles.closeButton}>
                <CloseButton
                  name="close"
                  onPress={cancelAdding}
                  size={commonStyles.iconSize.large}
                />
              </View>
              <FormCarousel>
                <DateDetails values={values} setFieldValue={setFieldValue} />
                <BikeDetails>
                  <ImagePickerComponent
                    pickedImages={pickedImages}
                    setPickedImages={setPickedImages}
                  />
                  <BikeInputFields
                    values={values}
                    setFieldValue={setFieldValue}
                  />
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
