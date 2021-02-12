import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import commonStyles from '../../Utils/commonStyles';

export const FormCarousel = ({children}) => {
  const [interval, setInterval] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const intervals = 3;
  const init = (w) => {
    // initialise width
    setWidth(w);
  };

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i === intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1,
        }}>
        &bull;
      </Text>,
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.horizontalScrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast">
        {children}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

export default FormCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalScrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bullets: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  bullet: {
    paddingHorizontal: commonStyles.gap[0],
    fontSize: commonStyles.iconSize.large,
  },
});
