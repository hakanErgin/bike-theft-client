import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {
  GET_THEFTS,
  DELETE_THEFT,
  GET_THEFT,
  GET_USERS_THEFTS,
} from '../../Utils/gql';
import {useSelectedTheftId} from '../../ContextProviders/SelectedTheftIdContext';
import {LoadingView, ErrorView} from '../../Utils/commonComponents';
import DeleteButton from './Components/DeleteButton';
import {
  DateDetailsView,
  BikeDetailsView,
  OtherDetailsView,
} from './Components/DetailsViews';
import {
  useIsViewModalVisible,
  useToggleIsViewModalVisible,
} from '../../ContextProviders/IsViewModalVisibleContext';
import Modal from 'react-native-modal';
import commonStyles from '../../Utils/commonStyles';
import CloseButton from 'react-native-vector-icons/MaterialIcons';
import {useCurrentUser} from '../../ContextProviders/UserContext';

const ViewModal = () => {
  const [viewingUserId, setViewingUserId] = useState();
  const [token, setToken] = useState();
  const isViewModalVisible = useIsViewModalVisible();
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const selectedTheftId = useSelectedTheftId();
  const currentUser = useCurrentUser();

  //#region

  useEffect(() => {
    if (currentUser) {
      setToken(currentUser.idToken);
      setViewingUserId(currentUser.user.id);
    }
  }, [currentUser]);

  const {loading: get_loading, error: get_error, data: get_data} = useQuery(
    GET_THEFT,
    {
      variables: {id: selectedTheftId},
    },
  );

  const [submitDeleteMutation, {loading: delete_loading}] = useMutation(
    DELETE_THEFT,
    {
      refetchQueries: [
        {query: GET_THEFTS},
        {
          query: GET_USERS_THEFTS,
          variables: {id_token: token && token},
        },
      ],
      onCompleted: () => setIsViewModalVisible(false),
      onError: (err) => console.log(err),
    },
  );

  if (get_loading || delete_loading) {
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
              <DeleteButton
                submitDeleteMutation={submitDeleteMutation}
                selectedTheftId={selectedTheftId}
                get_data={get_data}
                token={token}
              />
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => {
              setIsViewModalVisible(false);
            }}>
            <CloseButton name="close" style={styles.closeButton} />
          </TouchableOpacity>
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
});
