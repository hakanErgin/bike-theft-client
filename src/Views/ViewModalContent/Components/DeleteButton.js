import React from 'react';
import {Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {BoldText} from '../../../Utils/commonComponents';
import commonStyles from '../../../Utils/commonStyles';

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
    <TouchableOpacity
      onPress={() => showConfirmationAlert(deleteTheft)}
      style={styles.deleteButton}>
      <BoldText style={styles.deleteButtonText}>Delete this report</BoldText>
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  deleteButton: {
    marginVertical: commonStyles.gap[0],
    padding: commonStyles.gap[2],
    backgroundColor: commonStyles.containerBackgroundColor.light,
    borderRadius: commonStyles.borderRadius.large,
    borderColor: commonStyles.iconColor.darkRed,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 3,
  },
  deleteButtonText: {
    color: commonStyles.iconColor.darkRed,
    fontSize: commonStyles.fontSize.large,
  },
});
