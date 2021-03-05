import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

export const FormCarousel = ({
  children,
  intervals,
  setWidth,
  width,
  setInterval,
}) => {
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

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.horizontalScrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast">
        {children}
      </ScrollView>
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
});
