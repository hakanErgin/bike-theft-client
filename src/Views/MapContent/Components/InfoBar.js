import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import commonStyles from '../../../Utils/commonStyles';
import {NormalText} from '../../../Utils/commonComponents';

const InfoBar = ({currentRegionBoundaries, thefts}) => {
  const [nrOfTheftsInRegion, setNrOfTheftsInRegion] = useState();

  useEffect(() => {
    if (currentRegionBoundaries != null && thefts != null) {
      const theftsInRegion = thefts.filter(
        (theft) =>
          theft.region.longitude >=
            currentRegionBoundaries.southWest.longitude &&
          theft.region.longitude <=
            currentRegionBoundaries.northEast.longitude &&
          theft.region.latitude >= currentRegionBoundaries.southWest.latitude &&
          theft.region.latitude <= currentRegionBoundaries.northEast.latitude,
      );
      setNrOfTheftsInRegion(theftsInRegion.length);
    }
  }, [thefts, currentRegionBoundaries]);

  const getColor = () => {
    if (nrOfTheftsInRegion <= 3 && nrOfTheftsInRegion > 0) {
      return 'yellow';
    }
    if (nrOfTheftsInRegion > 3) {
      return 'red';
    }
    return 'green';
  };
  return (
    <View style={styles.statusBarContainer}>
      <NormalText>{`${nrOfTheftsInRegion} theft${
        nrOfTheftsInRegion > 1 ? 's' : ''
      } in this area`}</NormalText>
      <View style={[styles.trafficLight, {backgroundColor: getColor()}]} />
    </View>
  );
};

export default InfoBar;

const styles = StyleSheet.create({
  statusBarContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: commonStyles.gap[3],
    padding: commonStyles.gap[2],
    backgroundColor: commonStyles.containerBackgroundColor.light,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderRadius: commonStyles.borderRadius.normal,

    elevation: 0.25,
  },
  trafficLight: {
    borderRadius: commonStyles.borderRadius.normal,
    backgroundColor: 'red',
    marginLeft: commonStyles.gap[3],
    width: 20,
    height: 20,
  },
});
