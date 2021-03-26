import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
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
import Check from 'react-native-vector-icons/AntDesign';
import Cancel from 'react-native-vector-icons/AntDesign';
import commonStyles from '../../Utils/commonStyles';
import {mediaClient} from '../../ContextProviders/CombinedProviders';
import {LoadingView, BoldText} from '../../Utils/commonComponents';
import {useCurrentUser} from '../../ContextProviders/UserContext';

import {BikeDetails, BikeInputFields} from './Components/Intervals/BikeDetails';
import {OtherDetails} from './Components/Intervals/OtherDetails';
import {DateDetails} from './Components/Intervals/DateDetails';
import ImagePickerComponent from './Components/ImagePicker';
import {submitForm, initialValues, validate} from '../../Utils/formUtils';
import FlashMessage from 'react-native-flash-message';
import Bullets from './Components/Bullets';

const FormModal = ({
  isFormModalVisible,
  selectedRegion,
  setIsFormModalVisible,
}) => {
  const [pickedImages, setPickedImages] = useState([]);
  const currentUser = useCurrentUser();
  const setIsAddingNewTheft = useToggleIsAddingNewTheft();
  const [token, setToken] = useState();
  const [isSharingContact, setIsSharingContact] = useState(false);
  // carousel intervals
  const [interval, setInterval] = useState(1);
  const [width, setWidth] = useState(0);
  const intervals = 3;

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
    if (currentUser) {
      setToken(currentUser.idToken);
    }
  }, [currentUser]);

  // #endregion

  function finishAddingTheft() {
    setIsFormModalVisible(false);
    setIsAddingNewTheft(false);
  }
  if (create_loading || single_file_loading || multi_file_loading) {
    return <LoadingView />;
  }

  return (
    <Modal
      isVisible={isFormModalVisible}
      style={styles.modal}
      transparent={false}>
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
            token,
            isSharingContact,
          )
        }>
        {({handleChange, values, handleSubmit, setFieldValue}) => (
          <View style={styles.form}>
            <BoldText style={styles.header}>Report a theft</BoldText>
            <FormCarousel
              intervals={intervals}
              setWidth={setWidth}
              width={width}
              setInterval={setInterval}>
              <DateDetails values={values} setFieldValue={setFieldValue} />
              <BikeDetails>
                <ImagePickerComponent
                  pickedImages={pickedImages}
                  setPickedImages={setPickedImages}
                />
                <ScrollView persistentScrollbar={true}>
                  <BikeInputFields
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                </ScrollView>
              </BikeDetails>
              <OtherDetails
                handleChange={handleChange}
                values={values}
                isSharingContact={isSharingContact}
                setIsSharingContact={setIsSharingContact}
              />
            </FormCarousel>
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={finishAddingTheft}>
                <Cancel name="closecircleo" style={styles.cancel} />
              </TouchableOpacity>
              <Bullets intervals={intervals} interval={interval} />
              <TouchableOpacity
                style={styles.checkContainer}
                onPress={handleSubmit}>
                <Check name="checkcircleo" style={styles.check} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <FlashMessage position="top" />
    </Modal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    backgroundColor: commonStyles.containerBackgroundColor.light,
    borderRadius: commonStyles.borderRadius.xl,
  },
  form: {
    flex: 1,
    margin: commonStyles.gap[3],
  },
  header: {fontSize: commonStyles.fontSize.xl, textAlign: 'center'},
  check: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cancel: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
});
