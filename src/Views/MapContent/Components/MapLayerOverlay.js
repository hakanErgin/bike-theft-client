import React from 'react';
import {Text} from 'react-native';
import {Marker, Heatmap, Callout} from 'react-native-maps';
import {useMutation} from '@apollo/client';
import {GET_THEFTS, DELETE_THEFT} from '../../../Utils/gql';

const MarkersWithCallouts = ({thefts}) => {
  const [
    submitDeleteMutation,
    {error: delete_error},
  ] = useMutation(DELETE_THEFT, {refetchQueries: [{query: GET_THEFTS}]});

  const deleteTheft = (theftId) => () => {
    submitDeleteMutation({
      variables: {input: {_id: theftId}},
    });
  };

  if (delete_error) {
    console.log(delete_error);
  }

  return thefts.map((theft, index) => {
    const theftId = theft._id;
    return (
      <Marker
        key={index}
        coordinate={{
          latitude: theft.region.latitude,
          longitude: theft.region.longitude,
        }}>
        <Callout onPress={deleteTheft(theftId)}>
          <Text>id: {theftId}</Text>
          <Text>stuff that happened here</Text>
          <Text>Tap for details</Text>
        </Callout>
      </Marker>
    );
  });
};

export default function MapLayerOverlay({visibleMapLayer, thefts}) {
  if (visibleMapLayer === 'heatmap') {
    return <Heatmap points={thefts.map((t) => t.region)} />;
  } else if (visibleMapLayer === 'markers') {
    return <MarkersWithCallouts thefts={thefts} />;
  }
}
