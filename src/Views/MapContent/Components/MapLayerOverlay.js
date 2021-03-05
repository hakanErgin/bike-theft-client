import React from 'react';
import {Marker, Heatmap, Callout} from 'react-native-maps';
import {useSetSelectedTheftId} from '../../../ContextProviders/SelectedTheftIdContext';
import {useToggleIsViewModalVisible} from '../../../ContextProviders/IsViewModalVisibleContext';
import {NormalText} from '../../../Utils/commonComponents';

const MarkersWithCallouts = ({thefts}) => {
  const setSelectedTheftId = useSetSelectedTheftId();
  const setIsViewModalVisible = useToggleIsViewModalVisible();

  const onCalloutPress = (theftId) => () => {
    setSelectedTheftId(theftId);
    setIsViewModalVisible(true);
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

export default function MapLayerOverlay({visibleMapLayer, thefts}) {
  if (visibleMapLayer === 'heatmap' && thefts.length > 0) {
    return <Heatmap points={thefts.map((t) => t.region)} />;
  } else if (visibleMapLayer === 'markers') {
    return <MarkersWithCallouts thefts={thefts} />;
  } else {
    return null;
  }
}
