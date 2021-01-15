import React, {useState} from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import styles from './modalStyles';
import Modal from 'react-native-modal';

const ViewModal = ({isViewModalVisible, setIsViewModalVisible}) => {
  return (
    <Modal isVisible={isViewModalVisible}>
      <View style={styles.modal}>
        <Text>yes</Text>
      </View>
    </Modal>
  );
};

export default ViewModal;
