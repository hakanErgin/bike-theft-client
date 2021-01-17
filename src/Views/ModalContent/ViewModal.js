import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from './modalStyles';
import Modal from 'react-native-modal';
import {useQuery, useMutation} from '@apollo/client';
import {GET_THEFTS, DELETE_THEFT, GET_THEFT} from '../../Utils/gql';

const ViewModal = ({
  isViewModalVisible,
  setIsViewModalVisible,
  selectedTheftId,
}) => {
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
    console.log(delete_error);
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
