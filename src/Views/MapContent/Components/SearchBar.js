import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '@env';
import commonStyles from '../../../Utils/commonStyles';
import commonVariables from '../../../Utils/commonVariables';
import ClearIcon from 'react-native-vector-icons/MaterialIcons';

export default function SearchBar({mapRef}) {
  const searchBarRef = useRef(null);

  function clearInput() {
    searchBarRef.current?.setAddressText('');
    searchBarRef.current?.isFocused() && searchBarRef.current?.blur();
  }
  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        styles={searchBarStyles}
        ref={searchBarRef}
        placeholder="Search"
        onPress={(data, details) => {
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
        debounce={commonVariables.SEARCH_DEBOUNCE}
        enablePoweredByContainer={false}
        minLength={commonVariables.SEARCH_MIN_CHAR_TRIGGER}
        renderRightButton={() =>
          searchBarRef?.current?.getAddressText() ? (
            <ClearIcon
              name="clear"
              style={styles.clearIcon}
              onPress={clearInput}
            />
          ) : null
        }
      />
    </View>
  );
}
const searchBarStyles = {
  textInputContainer: {
    alignItems: 'center',
  },
  textInput: {elevation: 1},
};

const styles = StyleSheet.create({
  searchBarContainer: {
    zIndex: 10,
    alignSelf: 'center',
    flex: 1,
    position: 'absolute',
    top: commonStyles.gap[3],
    width: '65%',
  },
  clearIcon: {
    fontSize: commonStyles.iconSize.large,
    position: 'absolute',
    right: commonStyles.gap[2],
    color: commonStyles.iconColor.lightGrey,
    backgroundColor: commonStyles.containerBackgroundColor.light,
  },
});
