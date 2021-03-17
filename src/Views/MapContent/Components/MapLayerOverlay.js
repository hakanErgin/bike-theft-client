import React from 'react';
import {Marker, Heatmap, Callout} from 'react-native-maps';
import {useSetSelectedTheftId} from '../../../ContextProviders/SelectedTheftIdContext';
import {useToggleIsViewModalVisible} from '../../../ContextProviders/IsViewModalVisibleContext';
import {useIsAddingNewTheft} from '../../../ContextProviders/IsAddingNewTheftContext';
import {NormalText} from '../../../Utils/commonComponents';

const MarkersWithCallouts = ({thefts}) => {
  const setSelectedTheftId = useSetSelectedTheftId();
  const setIsViewModalVisible = useToggleIsViewModalVisible();
  const isAddingNewTheft = useIsAddingNewTheft();

  const onCalloutPress = (theftId) => () => {
    if (!isAddingNewTheft) {
      setSelectedTheftId(theftId);
      setIsViewModalVisible(true);
    }
  };

  return thefts.map((theft, index) => {
    const dateCreated = new Date(theft.created_at);
    const theftId = theft._id;
    return (
      <Marker
        key={index}
        coordinate={{
          latitude: theft.region.latitude,
          longitude: theft.region.longitude,
        }}>
        <Callout onPress={onCalloutPress(theftId)}>
          <NormalText>
            Reported on:{dateCreated.toDateString().substring(3)}
          </NormalText>
          <NormalText>Tap for details</NormalText>
        </Callout>
      </Marker>
    );
  });
};

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function getWeightFromFreshness(freshnessInDays, highestFreshnessDifference) {
  // highestFreshnessDifference = yMax
  const minFreshness = 0; // yMin

  const maxWeight = 5;
  const minWeight = 1;

  function convertRange(value, r1, r2) {
    return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
  }
  const weight = convertRange(
    freshnessInDays,
    [highestFreshnessDifference, minFreshness],
    [minWeight, maxWeight],
  );
  return weight;
}

function getTheftsWithFreshness(thefts) {
  const todaysDate = new Date();
  let highestFreshnessDifference = 0;

  // set the highest difference first
  const theftsWithFreshness = thefts.map((t) => {
    const theftDate = new Date(t.date_time.date);
    const freshnessInDays = dateDiffInDays(theftDate, todaysDate);
    if (freshnessInDays > highestFreshnessDifference) {
      highestFreshnessDifference = freshnessInDays;
    }
    return {...t, freshness: freshnessInDays};
  });

  return theftsWithFreshness.map((t) => {
    return {
      ...t.region,
      weight: getWeightFromFreshness(t.freshness, highestFreshnessDifference),
    };
  });
}

export default function MapLayerOverlay({visibleMapLayer, thefts}) {
  if (thefts.length > 0) {
    if (visibleMapLayer === 'heatmap') {
      return (
        <Heatmap
          radius={30}
          opacity={1}
          points={getTheftsWithFreshness(thefts)}
        />
      );
    } else if (visibleMapLayer === 'markers') {
      return <MarkersWithCallouts thefts={thefts} />;
    }
  } else {
    return null;
  }
}
