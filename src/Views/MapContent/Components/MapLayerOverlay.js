import React from 'react';
import {Text} from 'react-native';
import {Marker, Heatmap, Callout} from 'react-native-maps';
import {useSetSelectedTheftId} from '../../../ContextProviders/SelectedTheftIdContext';

const MarkersWithCallouts = ({thefts, setIsViewModalVisible}) => {
  const setSelectedTheftId = useSetSelectedTheftId();

  const onCalloutPress = (theftId) => () => {
    setSelectedTheftId(theftId);
    setIsViewModalVisible(true);
  };

  return thefts.map((theft, index) => {
    const theftId = theft._id;
    return (
      <Marker
        key={index}
        coordinate={{
          latitude: theft.region.latitude,
          longitude: theft.region.longitude,
        }}>
        <Callout onPress={onCalloutPress(theftId)}>
          <Text>id: {theftId}</Text>
          <Text>stuff that happened here</Text>
          <Text>Tap for details</Text>
        </Callout>
      </Marker>
    );
  });
};

export default function MapLayerOverlay({
  visibleMapLayer,
  thefts,
  setIsViewModalVisible,
}) {
  if (visibleMapLayer === 'heatmap' && thefts.length > 0) {
    return <Heatmap points={thefts.map((t) => t.region)} />;
  } else if (visibleMapLayer === 'markers') {
    return (
      <MarkersWithCallouts
        thefts={thefts}
        setIsViewModalVisible={setIsViewModalVisible}
      />
    );
  } else {
    return null;
  }
}
