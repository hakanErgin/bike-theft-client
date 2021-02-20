import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import commonStyles from './commonStyles';

export function LoadingView() {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" color={commonStyles.iconColor.darkRed} />
    </View>
  );
}
export function ErrorView({error}) {
  console.log(error);
  return (
    <View style={styles.container}>
      <Text>Oops...</Text>
      <Text>There was a problem loading your content.</Text>
      <Text>Please restart your application</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: '40%',
    padding: 10,
    borderRadius: commonStyles.borderRadius.normal,
    backgroundColor: commonStyles.containerBackgroundColor.light,
  },
});
