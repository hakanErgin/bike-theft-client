import React, {useState, useEffect} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
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
import CloseButton from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../Utils/commonStyles';
import {mediaClient} from '../../ContextProviders/CombinedProviders';
import {getToken} from '../../Utils/GoogleSignin';
import {LoadingView} from '../../Utils/commonComponents';

import {BikeDetails} from './Components/Intervals/BikeDetails';
import {OtherDetails} from './Components/Intervals/OtherDetails';
import {DateDetails} from './Components/Intervals/DateDetails';
import ImagePickerComponent from './Components/ImagePicker';
import {BikeInputFields} from './Components/Intervals/BikeDetails';
import {submitForm, initialValues, validate} from '../../Utils/formUtils';
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
  const [token, setToken] = useState();

  //#region mutation/query
  const [submitCreateMutation, {loading: create_loading}] = useMutation(
    CREATE_THEFT,
    {
      refetchQueries: [
        {query: GET_THEFTS},
        {
          query: GET_USERS_THEFTS,
          variables: {id_token: token && token},
        },
      ],
      onCompleted: () => finishAddingTheft(),
      onError: (err) => console.log(err),
    },
  );
  const [singleUpload, {loading: single_file_loading}] = useMutation(
    SINGLE_FILE_UPLOAD,
    {
      onError: (err) => console.log(err),
      client: mediaClient,
    },
  );
  const [multiUpload, {loading: multi_file_loading}] = useMutation(
    MULTI_FILE_UPLOAD,
    {
      onError: (err) => console.log(err),
      client: mediaClient,
    },
  );

  useEffect(() => {
    (async function () {
      getToken().then((result) => {
        setToken(result.idToken);
      });
    })();
  }, []);

  // #endregion

  function finishAddingTheft() {
    setIsFormModalVisible(false);
    setIsAddingNewTheft(false);
  }
  if (create_loading || single_file_loading || multi_file_loading) {
    return <LoadingView />;
  }

  return (
    <Modal isVisible={isFormModalVisible}>
      <View style={styles.modal}>
        <Formik
          validateOnChange={false}
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
              <TouchableOpacity
                style={styles.closeButtonContainer}
                onPress={finishAddingTheft}>
                <CloseButton name="close" style={styles.closeButton} />
              </TouchableOpacity>
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
    padding: commonStyles.gap[3],
  },
  form: {flex: 1, justifyContent: 'space-around'},
  header: {fontSize: commonStyles.fontSize.xl, textAlign: 'center'},
  closeButtonContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeButton: {
    fontSize: commonStyles.iconSize.large,
  },
});
