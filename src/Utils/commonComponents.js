import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import commonStyles from './commonStyles';

export function LoadingView() {
  return (
    <View style={styles.container}>
      <NormalText>Loading...</NormalText>
      <ActivityIndicator size="large" color={commonStyles.iconColor.darkRed} />
    </View>
  );
}
export function ErrorView({error}) {
  console.log(error);
  return (
    <View style={styles.container}>
      <NormalText>Oops...</NormalText>
      <NormalText>There was a problem loading your content.</NormalText>
      <NormalText>Please restart your application</NormalText>
    </View>
  );
}

export function NormalText({style, children}) {
  return <Text style={[style, styles.normalText]}>{children}</Text>;
}
export function BoldText({style, children}) {
  return <Text style={[style, styles.boldText]}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    zIndex: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: '40%',
    padding: commonStyles.gap[2],
    borderRadius: commonStyles.borderRadius.normal,
    backgroundColor: commonStyles.containerBackgroundColor.light,
  },
  normalText: {fontFamily: 'AlteHaasGroteskRegular'},
  boldText: {fontFamily: 'AlteHaasGroteskBold'},
});
