import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ViewIcon from 'react-native-vector-icons/Entypo';
import commonStyles from '../../../Utils/commonStyles';
import {GET_USERS_THEFTS} from '../../../Utils/gql';
import {useQuery} from '@apollo/client';

import {useSetSelectedTheftId} from '../../../ContextProviders/SelectedTheftIdContext';
import {useToggleIsViewModalVisible} from '../../../ContextProviders/IsViewModalVisibleContext';

// altho theres only one icon rn
function IconGroup({theftId}) {
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const setSelectedTheftId = useSetSelectedTheftId();

  function viewReport() {
    setIsViewModalVisible(true);
    setSelectedTheftId(theftId);
  }

  return (
    <ViewIcon
      name="magnifying-glass"
      style={styles.viewButton}
      onPress={viewReport}
    />
  );
}

export function UsersReportedThefts({currentUser}) {
  const [currentUsersThefts, setcurrentUsersThefts] = useState();
  /* const {error: get_error, data: get_data} = */ useQuery(GET_USERS_THEFTS, {
    variables: {id_token: currentUser.idToken},
    onCompleted: (data) => setcurrentUsersThefts(data.getUsersReportedThefts),
  });
  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>Your reports:</Text>
      <ScrollView>
        {currentUsersThefts &&
          currentUsersThefts.length > 0 &&
          currentUsersThefts.map((theft, index) => {
            // date gets converted to string when stored in state in the parent
            const dateCreated = new Date(theft.created_at);
            return (
              <View key={theft._id} style={styles.reportRows}>
                <Text>Reported on: {dateCreated.toDateString()}</Text>
                <IconGroup theftId={theft._id} />
              </View>
            );
          })}
      </ScrollView>
      <Text style={styles.centeredText}>Thanks for contributing!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eff1f8',
    flex: 0.5,
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  reportRows: {
    flexDirection: 'row',
    marginVertical: 1,
  },
  viewButton: {
    fontSize: commonStyles.iconSize.normal,
    color: commonStyles.iconColor.darkRed,
  },
  centeredText: {textAlign: 'center'},
});
