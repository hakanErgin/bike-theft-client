import React, {useState} from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import styles from './modalStyles';
import Modal from 'react-native-modal';
import {useMutation} from '@apollo/client';
import {GET_THEFTS, DELETE_THEFT} from '../../Utils/gql';

const ViewModal = ({
  isViewModalVisible,
  setIsViewModalVisible,
  selectedTheftId,
}) => {
  //#region del mutate
  const [
    submitDeleteMutation,
    {error: delete_error},
  ] = useMutation(DELETE_THEFT, {refetchQueries: [{query: GET_THEFTS}]});

  const deleteTheft = (theftId) => () => {
    submitDeleteMutation({
      variables: {input: {_id: theftId}},
    });
  };

  if (delete_error) {
    console.log(delete_error);
  }

  // onPress={deleteTheft(theftId)}

  //#endregion

  return (
    <Modal isVisible={isViewModalVisible}>
      <View style={styles.modal}>
        <Text>yes</Text>
        <Text>{selectedTheftId}</Text>
        <Button
          title={'close'}
          onPress={() => {
            setIsViewModalVisible(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default ViewModal;
