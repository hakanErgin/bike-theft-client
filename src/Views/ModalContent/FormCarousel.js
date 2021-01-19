import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Slide} from './Components/Slide';
import styles from './modalStyles';

export const FormCarousel = (props) => {
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
          ...styles.scrollView,
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
        <Slide title={1} />
        <Slide title={2} />
        <Slide title={3} />
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

export default FormCarousel;
