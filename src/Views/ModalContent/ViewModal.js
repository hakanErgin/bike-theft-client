import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
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

const ViewModal = () => {
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

  return get_data ? (
    <Modal isVisible={isViewModalVisible}>
      <View style={styles.modal}>
        <Text style={styles.header}>yes</Text>
        <Text>{get_data.getTheft.region.latitude}</Text>
        <Text>{get_data.getTheft.region.longitude}</Text>
        <Button
          title={'close'}
          onPress={() => {
            setIsViewModalVisible(false);
          }}
        />
        <Button title={'delete'} onPress={deleteTheft} />
      </View>
    </Modal>
  ) : null;
};

export default ViewModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: commonStyles.containerBackgroundColor.light,
    justifyContent: 'space-between',
    borderRadius: commonStyles.borderRadius.large,
    padding: commonStyles.gap[3],
  },
  header: {fontSize: commonStyles.fontSize.xl, textAlign: 'center'},
});
