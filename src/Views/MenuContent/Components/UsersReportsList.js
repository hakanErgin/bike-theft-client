import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import ViewIcon from 'react-native-vector-icons/Entypo';
import commonStyles from '../../../Utils/commonStyles';
import {GET_USERS_THEFTS} from '../../../Utils/gql';
import {useQuery} from '@apollo/client';

import {useSetSelectedTheftId} from '../../../ContextProviders/SelectedTheftIdContext';
import {useToggleIsViewModalVisible} from '../../../ContextProviders/IsViewModalVisibleContext';
import {
  LoadingView,
  ErrorView,
  NormalText,
  BoldText,
} from '../../../Utils/commonComponents';

function ViewButton({theftId}) {
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const setSelectedTheftId = useSetSelectedTheftId();

  function viewReport() {
    setIsViewModalVisible(true);
    setSelectedTheftId(theftId);
  }

  return (
    <TouchableOpacity
      onPress={viewReport}
      hitSlop={{
        top: commonStyles.hitSlop[1],
        bottom: commonStyles.hitSlop[1],
        left: commonStyles.hitSlop[1],
        right: commonStyles.hitSlop[1],
      }}>
      <ViewIcon name="magnifying-glass" style={styles.viewButton} />
    </TouchableOpacity>
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
            <BoldText style={[styles.centeredText, styles.header]}>
              Your report(s):
            </BoldText>
            <ScrollView>
              {usersReportedThefts.map((theft) => {
                return (
                  <View key={theft._id} style={styles.reportRows}>
                    <NormalText style={styles.centeredText}>
                      {theft.bike.brand} -{' '}
                    </NormalText>
                    <ViewButton theftId={theft._id} />
                  </View>
                );
              })}
            </ScrollView>
          </>
        ) : (
          <>
            <NormalText style={styles.centeredText}>
              You do not have any thefts reported yet.
            </NormalText>
            <NormalText style={styles.centeredText}>
              Create a report and please provide as much information as
              possible.
            </NormalText>
            <NormalText style={styles.centeredText}>
              Then your reports will be displayed here for easy access and on
              the map.
            </NormalText>
          </>
        )}
        <NormalText style={[styles.centeredText, styles.bottomText]}>
          Thanks for contributing!
        </NormalText>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.containerBackgroundColor.lightRed,
    paddingVertical: commonStyles.gap[7],
    borderRadius: commonStyles.borderRadius.xl,
    justifyContent: 'space-evenly',
  },
  header: {
    marginBottom: commonStyles.gap[3],
    fontSize: commonStyles.fontSize.large,
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
  centeredText: {
    textAlign: 'center',
    fontSize: commonStyles.fontSize.normal,
    color: 'black',
  },
  bottomText: {
    marginTop: commonStyles.gap[1],
    fontStyle: 'italic',
  },
});
