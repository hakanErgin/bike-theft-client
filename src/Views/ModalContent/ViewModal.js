import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {GET_THEFTS, DELETE_THEFT, GET_THEFT} from '../../Utils/gql';
import {useSelectedTheftId} from '../../ContextProviders/SelectedTheftIdContext';
import {
  useIsViewModalVisible,
  useToggleIsViewModalVisible,
} from '../../ContextProviders/IsViewModalVisibleContext';
import Modal from 'react-native-modal';

const ViewModal = () => {
  const isViewModalVisible = useIsViewModalVisible();
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const selectedTheftId = useSelectedTheftId();

  //#region
  const {error: get_error, data: get_data} = useQuery(GET_THEFT, {
    variables: {id: selectedTheftId},
  });

  const [
    submitDeleteMutation,
    {error: delete_error},
  ] = useMutation(DELETE_THEFT, {refetchQueries: [{query: GET_THEFTS}]});

  const deleteTheft = () => {
    submitDeleteMutation({
      variables: {input: {_id: selectedTheftId}},
    });
    setIsViewModalVisible(false);
  };

  if (delete_error || get_error) {
    console.log(delete_error || get_error);
  }

  // onPress={deleteTheft(theftId)}

  //#endregion

  return get_data ? (
    <Modal isVisible={isViewModalVisible}>
      <View style={styles.modal}>
        <Text>yes</Text>
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
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 30,
  },
  form: {flex: 1, justifyContent: 'space-around'},
  header: {fontSize: 24, textAlign: 'center'},
});
