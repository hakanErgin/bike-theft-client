import React from 'react';
import {View, Text} from 'react-native';
import EditIcon from 'react-native-vector-icons/Feather';
import ViewIcon from 'react-native-vector-icons/Entypo';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import {useSetSelectedTheftId} from '../../../ContextProviders/SelectedTheftIdContext';
import {useToggleIsViewModalVisible} from '../../../ContextProviders/IsViewModalVisibleContext';

function IconGroup({editReport, deleteReport, theftId}) {
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const selectedTheftId = useSetSelectedTheftId();

  const iconSize = 15;
  const iconColor = '#900';

  function viewReport() {
    setIsViewModalVisible(true);
    selectedTheftId(theftId);
  }

  return (
    <View style={{flexDirection: 'row'}}>
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
          <View key={theft._id} style={{flexDirection: 'row'}}>
            <Text>{theft._id}</Text>
            <IconGroup theftId={theft._id} />
          </View>
        );
      })}
    </View>
  );
}
