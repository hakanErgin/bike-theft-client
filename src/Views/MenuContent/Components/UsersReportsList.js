import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EditIcon from 'react-native-vector-icons/Feather';
import ViewIcon from 'react-native-vector-icons/Entypo';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import commonStyles from '../../../Utils/commonStyles';

import {useSetSelectedTheftId} from '../../../ContextProviders/SelectedTheftIdContext';
import {useToggleIsViewModalVisible} from '../../../ContextProviders/IsViewModalVisibleContext';

function IconGroup({editReport, deleteReport, theftId}) {
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const selectedTheftId = useSetSelectedTheftId();

  const iconSize = commonStyles.iconSize.normal;
  const iconColor = commonStyles.iconColor.darkRed;

  function viewReport() {
    setIsViewModalVisible(true);
    selectedTheftId(theftId);
  }

  return (
    <View style={styles.container}>
      <ViewIcon
        name="magnifying-glass"
        size={iconSize}
        color={iconColor}
        onPress={viewReport}
      />
      <EditIcon
        name="edit"
        size={iconSize}
        color={iconColor}
        onPress={editReport}
      />
      <DeleteIcon
        name="delete"
        size={iconSize}
        color={iconColor}
        onPress={deleteReport}
      />
    </View>
  );
}

export default function UsersReportsList({currentUsersThefts}) {
  return (
    <View>
      <Text>Your reports:</Text>
      {currentUsersThefts.map((theft, index) => {
        return (
          <View key={theft._id} style={styles.container}>
            <Text>{theft._id}</Text>
            <IconGroup theftId={theft._id} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
});
