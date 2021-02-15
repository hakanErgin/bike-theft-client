import React, {useState} from 'react';
import {Button, Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {GET_THEFTS, DELETE_THEFTT, GET_THEFT} from '../../Utils/gql';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useSelectedTheftId} from '../../ContextProviders/SelectedTheftIdContext';
import {
  useIsViewModalVisible,
  useToggleIsViewModalVisible,
} from '../../ContextProviders/IsViewModalVisibleContext';
import Modal from 'react-native-modal';
import commonStyles from '../../Utils/commonStyles';
import {getCurrentUser} from '../MenuContent/Components/GoogleButtons';
import CloseButton from 'react-native-vector-icons/FontAwesome';

function FieldRow({field, value}) {
  return (
    <View
      style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={{flex: 1}}>{field}</Text>
      <Text style={{flex: 1}}>{value}</Text>
    </View>
  );
}

function ViewDateDetails({theftData}) {
  const dateCreated = new Date(theftData.created_at);
  const dateStolen = new Date(theftData.date_time.date);

  return (
    <View style={styles.detailsContainer}>
      <FieldRow field={'Was reported on:'} value={dateCreated.toDateString()} />
      <FieldRow field={'Date stolen:'} value={dateStolen.toDateString()} />
      <FieldRow
        field={'Time of the day it was stolen on:'}
        value={theftData.date_time.time}
      />
    </View>
  );
}
function ViewBikeDetails({theftData}) {
  return (
    <View style={styles.detailsContainer}>
      <FieldRow field={'Bike type:'} value={theftData.bike.type} />
      <FieldRow field={'Bike brand:'} value={theftData.bike.brand} />
      <FieldRow field={'Bike manufacture year:'} value={theftData.bike.year} />
      <FieldRow field={'Bike frame size:'} value={theftData.bike.frame_size} />
      <FieldRow field={'Bike wheel size:'} value={theftData.bike.wheel_size} />
      {theftData.bike.photos.length > 0 &&
        theftData.bike.photos.map((img) => {
          return <Image key={img} source={{uri: img}} style={styles.image} />;
        })}
    </View>
  );
}
function ViewOtherDetails({theftData}) {
  return (
    <View style={styles.detailsContainer}>
      <FieldRow field={'Other Comments:'} value={theftData.comments} />
    </View>
  );
}

const ViewModal = () => {
  const [viewingUserId, setViewingUserId] = useState();
  const isViewModalVisible = useIsViewModalVisible();
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const selectedTheftId = useSelectedTheftId();

  //#region
  const {error: get_error, data: get_data} = useQuery(GET_THEFT, {
    variables: {id: selectedTheftId},
    onCompleted: (res) => console.log(res),
  });

  const [submitDeleteMutation, {error: delete_error}] = useMutation(
    DELETE_THEFTT,
    {
      refetchQueries: [{query: GET_THEFTS}],
      onCompleted: (res) => console.log(res),
    },
  );

  async function deleteTheft() {
    const currentToken = await GoogleSignin.getTokens();
    console.log({currentToken}, {selectedTheftId});
    submitDeleteMutation({
      variables: {
        id_token: currentToken.idToken,
        theftId: selectedTheftId,
        theftUserId: get_data && get_data.getTheft.userId,
      },
    });
    setIsViewModalVisible(false);
  }

  if (delete_error || get_error) {
    console.log(delete_error || get_error);
  }
  //#endregion

  if (get_data) {
    const theftData = get_data.getTheft;
    getCurrentUser().then((res) => setViewingUserId(res.user.id));

    return (
      <Modal isVisible={isViewModalVisible}>
        <View style={styles.modal}>
          <ScrollView>
            <Text style={styles.header}>Reported bike theft</Text>
            <ViewDateDetails theftData={theftData} />
            <ViewBikeDetails theftData={theftData} />
            <ViewOtherDetails theftData={theftData} />
            <View style={styles.closeButtonContainer}>
              <CloseButton
                name="close"
                onPress={() => {
                  setIsViewModalVisible(false);
                }}
                style={styles.closeButton}
              />
            </View>
            {viewingUserId === theftData.user.google_id && (
              <Button title={'delete'} onPress={deleteTheft} />
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  } else {
    return null;
  }
};

export default ViewModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: commonStyles.containerBackgroundColor.light,
    justifyContent: 'space-between',
    borderRadius: commonStyles.borderRadius.large,
    padding: commonStyles.gap[3],
  },
  header: {fontSize: commonStyles.fontSize.xl, textAlign: 'center'},
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
  detailsContainer: {
    backgroundColor: '#eff1f8',
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    marginRight: commonStyles.gap[2],
    width: 75,
    height: 75,
    borderRadius: commonStyles.borderRadius.normal,
  },
});
