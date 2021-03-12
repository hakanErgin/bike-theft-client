import React from 'react';
import commonStyles from '../../../Utils/commonStyles';
import {StyleSheet, View} from 'react-native';
import {NormalText} from '../../../Utils/commonComponents';

const Bullets = ({intervals, interval}) => {
  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <NormalText
        key={i}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.bullet,
          opacity: interval === i ? 1 : 0.1,
        }}>
        &bull;
      </NormalText>,
    );
  }

  return (
    <View style={styles.container}>
      <NormalText style={styles.pageIndicator}>
        {interval}/{intervals}
      </NormalText>
      <View style={styles.bulletsContainer}>{bullets}</View>
    </View>
  );
};

export default Bullets;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center'},
  bulletsContainer: {
    flexDirection: 'row',
  },
  bullet: {
    paddingHorizontal: commonStyles.gap[0],
    fontSize: commonStyles.fontSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  pageIndicator: {
    fontSize: commonStyles.fontSize.tiny,
    color: 'black',
  },
});
