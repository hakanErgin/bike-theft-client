import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '@env';
import commonStyles from '../../../Utils/commonStyles';
import commonVariables from '../../../Utils/commonVariables';
import ClearIcon from 'react-native-vector-icons/MaterialIcons';
import MenuButton from './MenuButton';
import MyLocationButton from './MyLocationButton';
import CrosshairOverlay from '../../ModalContent/Components/CrosshairOverlay';
import Crosshair from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TopBar({
  mapRef,
  navigation,
  usersLocation,
  MY_POSITION_ZOOM_LEVEL,
  setUsersLocation,
  currentRegion,
  setSelectedRegion,
  setIsFormModalVisible,
  isAddingNewTheft,
}) {
  const searchBarRef = useRef(null);

  function clearInput() {
    searchBarRef.current?.setAddressText('');
    searchBarRef.current?.isFocused() && searchBarRef.current?.blur();
  }
  return (
    <View style={styles.topBarContainer} pointerEvents="box-none">
      <View
        style={{
          flexDirection: 'row',
        }}>
        <MenuButton navigation={navigation} />
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
        <MyLocationButton
          ref={mapRef}
          usersLocation={usersLocation}
          MY_POSITION_ZOOM_LEVEL={MY_POSITION_ZOOM_LEVEL}
          setUsersLocation={setUsersLocation}
        />
      </View>
      {isAddingNewTheft && (
        <>
          <CrosshairOverlay
            currentRegion={currentRegion}
            setSelectedRegion={setSelectedRegion}
            setIsFormModalVisible={setIsFormModalVisible}
          />
          <View style={styles.crosshairContainer}>
            <Crosshair name="crosshairs" style={styles.crosshair} />
          </View>
        </>
      )}
    </View>
  );
}
const searchBarStyles = {
  textInputContainer: {
    marginHorizontal: 12,
    marginTop: 4,
  },
};

const styles = StyleSheet.create({
  topBarContainer: {
    zIndex: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'absolute',
    top: commonStyles.gap[3],
    right: commonStyles.gap[1],
    left: commonStyles.gap[1],
    bottom: commonStyles.gap[1],
  },
  clearIcon: {
    fontSize: commonStyles.iconSize.large,
    position: 'absolute',
    right: commonStyles.gap[2],
    color: commonStyles.iconColor.lightGrey,
    backgroundColor: commonStyles.containerBackgroundColor.light,
  },
  crosshair: {
    fontSize: commonStyles.iconSize.xl,
    color: commonStyles.iconColor.darkRed,
  },
  crosshairContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: commonStyles.gap[3],
    right: commonStyles.gap[3],
    left: commonStyles.gap[3],
    bottom: commonStyles.gap[3],
  },
});
