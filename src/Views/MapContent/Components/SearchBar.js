import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '@env';
import commonStyles from '../../../Utils/commonStyles';
import commonVariables from '../../../Utils/commonVariables';

export default function SearchBar({mapRef}) {
  console.log('hi');
  return (
    <View style={styles.searchBoxContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details) => {
          console.log(data, details.geometry.location);
          mapRef.current != null &&
            mapRef.current.animateToRegion(
              {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: commonVariables.SEARCH_ZOOM_LEVEL,
                longitudeDelta: commonVariables.SEARCH_ZOOM_LEVEL,
              },
              commonVariables.SEARCH_ANIMATION_SPEED,
            );
        }}
        fetchDetails={true}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBoxContainer: {
    zIndex: 10,
    alignSelf: 'center',
    flex: 1,
    position: 'absolute',
    top: commonStyles.gap[2],
    width: '60%',
  },
});
