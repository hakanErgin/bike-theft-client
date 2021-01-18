import React from 'react';
import {Text} from 'react-native';
import {Marker, Heatmap, Callout} from 'react-native-maps';

const MarkersWithCallouts = ({
  thefts,
  setSelectedTheftId,
  setIsViewModalVisible,
}) => {
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
  setSelectedTheftId,
  setIsViewModalVisible,
}) {
  if (visibleMapLayer === 'heatmap') {
    return <Heatmap points={thefts.map((t) => t.region)} />;
  } else if (visibleMapLayer === 'markers') {
    return (
      <MarkersWithCallouts
        thefts={thefts}
        setSelectedTheftId={setSelectedTheftId}
        setIsViewModalVisible={setIsViewModalVisible}
      />
    );
  }
}
