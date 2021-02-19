import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ViewIcon from 'react-native-vector-icons/Entypo';
import commonStyles from '../../../Utils/commonStyles';
import {GET_USERS_THEFTS} from '../../../Utils/gql';
import {useQuery} from '@apollo/client';

import {useSetSelectedTheftId} from '../../../ContextProviders/SelectedTheftIdContext';
import {useToggleIsViewModalVisible} from '../../../ContextProviders/IsViewModalVisibleContext';
import {LoadingView, ErrorView} from '../../../Utils/commonComponents';

function ViewButton({theftId}) {
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
  const {loading: get_loading, error: get_error, data: get_data} = useQuery(
    GET_USERS_THEFTS,
    {
      variables: {id_token: currentUser.idToken},
      onError: (err) => console.log(err),
    },
  );

  if (get_loading) {
    return <LoadingView />;
  }
  if (get_error) {
    return <ErrorView error={get_error} />;
  }

  if (get_data) {
    const usersReportedThefts = get_data.getUsersReportedThefts;
    return (
      <View style={styles.container}>
        {usersReportedThefts.length > 0 ? (
          <>
            <Text style={[styles.centeredText, styles.header]}>
              Your report(s):
            </Text>
            <ScrollView>
              {usersReportedThefts.map((theft, index) => {
                // date was converted to string when stored in state in the parent
                const dateCreated = new Date(theft.created_at);
                return (
                  <View key={theft._id} style={styles.reportRows}>
                    <Text>Reported on: {dateCreated.toDateString()} - </Text>
                    <ViewButton theftId={theft._id} />
                  </View>
                );
              })}
            </ScrollView>
          </>
        ) : (
          <>
            <Text style={styles.centeredText}>
              You do not have any thefts reported yet.
            </Text>
            <Text style={styles.centeredText}>
              Use the button below to create a report and please provide as much
              information as possible.
            </Text>
            <Text style={styles.centeredText}>
              Then your reports will be displayed here for easy access and on
              the map.
            </Text>
          </>
        )}
        <Text style={styles.centeredText}>Thanks for contributing!</Text>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.containerBackgroundColor.lightBlue,
    paddingVertical: commonStyles.gap[6],
    borderRadius: commonStyles.borderRadius.large,
    minHeight: '50%',
    justifyContent: 'space-evenly',
  },
  header: {
    marginBottom: commonStyles.gap[3],
    fontSize: 18,
    color: commonStyles.iconColor.darkRed,
  },
  reportRows: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: commonStyles.gap[0],
  },
  viewButton: {
    fontSize: commonStyles.iconSize.large,
    color: commonStyles.iconColor.darkRed,
  },
  centeredText: {textAlign: 'center'},
});
