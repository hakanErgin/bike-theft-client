import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {
  GET_THEFTS,
  DELETE_THEFT,
  GET_THEFT,
  GET_USERS_THEFTS,
} from '../../Utils/gql';
import {useSelectedTheftId} from '../../ContextProviders/SelectedTheftIdContext';
import {LoadingView, ErrorView, BoldText} from '../../Utils/commonComponents';
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
import CloseButton from 'react-native-vector-icons/AntDesign';
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
  //#endregion

  return (
    <Modal
      isVisible={isViewModalVisible}
      onBackdropPress={() => setIsViewModalVisible(false)}>
      <View style={styles.modal}>
        <View style={styles.headerContainer}>
          <BoldText style={styles.header}>Reported bike theft</BoldText>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            hitSlop={{
              top: commonStyles.hitSlop[4],
              bottom: commonStyles.hitSlop[4],
              left: commonStyles.hitSlop[4],
              right: commonStyles.hitSlop[4],
            }}
            onPress={() => {
              setIsViewModalVisible(false);
            }}>
            <CloseButton name="close" style={styles.closeButton} />
          </TouchableOpacity>
        </View>
        {get_data ? (
          <>
            <ScrollView>
              <DateDetailsView theftData={get_data.getTheft} />
              <BikeDetailsView theftData={get_data.getTheft} />
              <OtherDetailsView theftData={get_data.getTheft} />
            </ScrollView>
            {viewingUserId === get_data.getTheft.user.google_id && (
              <DeleteButton
                submitDeleteMutation={submitDeleteMutation}
                selectedTheftId={selectedTheftId}
                get_data={get_data}
                token={token}
              />
            )}
          </>
        ) : (
          <View style={styles.errorContainer}>
            <ErrorView error={get_error} />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ViewModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: commonStyles.containerBackgroundColor.light,
    justifyContent: 'space-between',
    borderRadius: commonStyles.borderRadius.xl,
    padding: commonStyles.gap[4],
    maxHeight: '98%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: commonStyles.gap[2],
  },
  header: {
    fontSize: commonStyles.fontSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  closeButtonContainer: {
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
  },
  closeButton: {
    fontSize: commonStyles.iconSize.large,
    color: commonStyles.iconColor.darkRed,
  },
  errorContainer: {height: '15%'},
});
