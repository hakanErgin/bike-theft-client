import React, {useState, useEffect} from 'react';
import {Button, Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {
  GET_THEFTS,
  DELETE_THEFT,
  GET_THEFT,
  GET_USERS_THEFTS,
} from '../../Utils/gql';
import {useSelectedTheftId} from '../../ContextProviders/SelectedTheftIdContext';
import {useIsUserLoggedIn} from '../../ContextProviders/IsUserLoggedInContext';
import {LoadingView, ErrorView} from '../../Utils/commonComponents';

import {
  useIsViewModalVisible,
  useToggleIsViewModalVisible,
} from '../../ContextProviders/IsViewModalVisibleContext';
import Modal from 'react-native-modal';
import commonStyles from '../../Utils/commonStyles';
import {getCurrentUser, getToken} from '../../Utils/GoogleSignin';
import CloseButton from 'react-native-vector-icons/MaterialIcons';

function FieldRow({field, value}) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldName}>{field}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

function DateDetailsView({theftData}) {
  const dateCreated = new Date(theftData.created_at);
  const dateStolen = new Date(theftData.date_time.date);

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.fieldHeader}>Date info</Text>
      <FieldRow field={'Reported on:'} value={dateCreated.toDateString()} />
      <FieldRow field={'Date stolen:'} value={dateStolen.toDateString()} />
      <FieldRow field={'Time of the day:'} value={theftData.date_time.time} />
    </View>
  );
}

function BikeDetailsView({theftData}) {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.fieldHeader}>Bike info</Text>
      <FieldRow field={'Type:'} value={theftData.bike.type} />
      <FieldRow field={'Brand:'} value={theftData.bike.brand} />
      <FieldRow field={'Manufacture year:'} value={theftData.bike.year} />
      <FieldRow field={'Frame size:'} value={theftData.bike.frame_size} />
      <FieldRow field={'Wheel size:'} value={theftData.bike.wheel_size} />
      {theftData.bike.photos.length > 0 && (
        <View style={styles.imageThumbnailContainer}>
          {theftData.bike.photos.map((img) => {
            return (
              <Image
                key={img}
                source={{uri: img}}
                style={styles.imageThumbnail}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
function OtherDetailsView({theftData}) {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.fieldHeader}>Other</Text>
      <FieldRow field={'Comments:'} value={theftData.comments} />
    </View>
  );
}

const ViewModal = () => {
  const [viewingUserId, setViewingUserId] = useState();
  const [token, setToken] = useState();
  const isViewModalVisible = useIsViewModalVisible();
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const selectedTheftId = useSelectedTheftId();
  const isUserLoggedIn = useIsUserLoggedIn();

  useEffect(() => {
    (async function () {
      getToken().then((result) => {
        setToken(result.idToken);
      });
    })();
  }, []);

  //#region
  const {loading: get_loading, error: get_error, data: get_data} = useQuery(
    GET_THEFT,
    {
      variables: {id: selectedTheftId},
    },
  );

  const [submitDeleteMutation] = useMutation(DELETE_THEFT, {
    refetchQueries: [
      {query: GET_THEFTS},
      {
        query: GET_USERS_THEFTS,
        variables: {id_token: token && token},
      },
    ],
    onCompleted: () => setIsViewModalVisible(false),
    onError: (err) => console.log(err),
  });

  async function deleteTheft() {
    const currentToken = await getToken();
    submitDeleteMutation({
      variables: {
        id_token: currentToken.idToken,
        theftId: selectedTheftId,
        theftUserId: get_data.getTheft.userId,
      },
    });
  }

  useEffect(() => {
    isUserLoggedIn &&
      getCurrentUser().then((res) => setViewingUserId(res.user.id));
  }, [isUserLoggedIn]);

  if (get_loading) {
    return <LoadingView />;
  }
  if (get_error) {
    return <ErrorView error={get_error} />;
  }
  //#endregion

  if (get_data) {
    const theftData = get_data.getTheft;

    return (
      <Modal isVisible={isViewModalVisible}>
        <View style={styles.modal}>
          <ScrollView>
            <Text style={styles.header}>Reported bike theft</Text>
            <DateDetailsView theftData={theftData} />
            <BikeDetailsView theftData={theftData} />
            <OtherDetailsView theftData={theftData} />

            {viewingUserId === theftData.user.google_id && (
              <Button title={'delete'} onPress={deleteTheft} />
            )}
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <CloseButton
              name="close"
              onPress={() => {
                setIsViewModalVisible(false);
              }}
              style={styles.closeButton}
            />
          </View>
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
    padding: commonStyles.gap[4],
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
    margin: commonStyles.gap[3],
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: commonStyles.containerBackgroundColor.lightBlue,
    paddingVertical: commonStyles.gap[2],
    borderRadius: commonStyles.borderRadius.normal,
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  imageThumbnailContainer: {flexDirection: 'row'},
  imageThumbnail: {
    margin: commonStyles.gap[3],
    width: 75,
    height: 75,
    borderRadius: commonStyles.borderRadius.normal,
  },
  fieldName: {flex: 1, color: commonStyles.iconColor.darkRed},
  fieldValue: {flex: 1},
  fieldHeader: {
    flex: 1,
    marginBottom: commonStyles.gap[2],
    fontSize: commonStyles.fontSize.large,
    color: commonStyles.iconColor.darkRed,
  },
  fieldRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
