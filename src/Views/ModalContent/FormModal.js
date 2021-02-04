import React, {useState} from 'react';
import {Button, Text, View, StyleSheet, Pressable} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
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

const FormModal = ({
  isFormModalVisible,
  selectedRegion,
  setIsFormModalVisible,
}) => {
  const [pickedImages, setPickedImages] = useState([]);
  const {longitude, latitude} = selectedRegion;
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();

  //#region mutation/query
  const [submitCreateMutation, {error: create_error}] = useMutation(
    CREATE_THEFT,
    {
      refetchQueries: [{query: GET_THEFTS}],
      onCompleted: (data) => console.log(data),
    },
  );
  const [singleUpload] = useMutation(SINGLE_FILE_UPLOAD, {
    client: mediaClient,
    onCompleted: (res) => console.log(res),
  });
  const [multiUpload] = useMutation(MULTI_FILE_UPLOAD, {
    client: mediaClient,
    onCompleted: (res) => console.log(res),
  });
  // #endregion

  //#region funcs
  const uploadImages = () => {
    pickedImages.length > 1
      ? multiUpload({variables: {files: pickedImages}})
      : singleUpload({variables: {file: pickedImages[0]}});
  };

  async function submitTheft(values) {
    console.log(values);
    const currentToken = await GoogleSignin.getTokens();
    submitCreateMutation({
      variables: {
        input: {
          region: {latitude, longitude},
          bike: {
            type: values.bike_details.type,
            brand: values.bike_details.brand,
            color: values.bike_details.color,
            year: values.bike_details.year,
            frame_size: values.bike_details.frame_size,
            wheel_size: values.bike_details.wheel_size,
            photos: [''],
          },
          comments: values.comments,
          date_time: {
            date: values.date_details.date,
            time: values.date_details.time,
          },
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
  //#endregion
  return (
    <Modal isVisible={isFormModalVisible}>
      <View style={styles.modal}>
        <Formik
          initialValues={{
            date_details: {date: new Date(), time: ''},
            bike_details: {
              type: '',
              brand: '',
              color: '',
              year: '',
              frame_size: '',
              wheel_size: '',
              photos: [''],
            },
            comments: '',
          }}
          onSubmit={submitTheft}>
          {({handleChange, values, handleSubmit, setFieldValue}) => (
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
