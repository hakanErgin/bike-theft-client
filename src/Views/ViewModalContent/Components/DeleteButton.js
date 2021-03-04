import React from 'react';
import {Button, Alert} from 'react-native';

const DeleteButton = ({
  submitDeleteMutation,
  selectedTheftId,
  get_data,
  token,
}) => {
  const showConfirmationAlert = (proceedAction) =>
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this report?',
      [
        {
          text: 'Cancel',
        },
        {text: 'OK', onPress: proceedAction},
      ],
      {cancelable: true},
    );

  async function deleteTheft() {
    submitDeleteMutation({
      variables: {
        id_token: token,
        theftId: selectedTheftId,
        theftUserId: get_data.getTheft.userId,
      },
    });
  }

  return (
    <Button
      title={'delete report'}
      onPress={() => showConfirmationAlert(deleteTheft)}
    />
  );
};

export default DeleteButton;
