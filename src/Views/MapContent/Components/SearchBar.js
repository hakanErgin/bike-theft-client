import React from 'react';
import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '@env';
import styles from '../mapStyles';

export default function SearchBar({mapRef}) {
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
                latitudeDelta: 2,
                longitudeDelta: 2,
              },
              2000,
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
