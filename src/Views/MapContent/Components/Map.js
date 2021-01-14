import React, {useState} from 'react';
import MapView from 'react-native-maps';
import MapLayerOverlay from './MapLayerOverlay';
import styles from '../mapStyles';

export default function Map({
  mapRef,
  initialRegion,
  isAddingNewTheft,
  setSelectedRegion,
  setIsModalVisible,
  currentRegion,
  setCurrentRegion,
  thefts,
}) {
  const [margin, setMargin] = useState(1);
  const [visibleMapLayer, setVisibleMapLayer] = useState('heatmap');

  function onMapPress(theft) {
    if (isAddingNewTheft === true) {
      const {latitude, longitude} = currentRegion; // theft.nativeEvent.coordinate;
      const region = {latitude, longitude};
      setSelectedRegion(region);
      setIsModalVisible(true);
    }
  }

  function updateStateAndMapLayers(region) {
    setCurrentRegion(region);
    function roundThemUp(original) {
      return Math.round(original * 100) / 10;
    }
    if (roundThemUp(region.longitudeDelta) >= 0.2) {
      setVisibleMapLayer('heatmap');
    } else if (roundThemUp(region.longitudeDelta) < 0.2) {
      setVisibleMapLayer('markers');
    }
  }

  return (
    <MapView
      style={{...styles.map, margin}}
      showsBuildings={false}
      showsUserLocation={true}
      showsMyLocationButton={true}
      zoomControlEnabled={true}
      onMapReady={() => setMargin(0)}
      initialRegion={initialRegion}
      onPress={onMapPress}
      onRegionChangeComplete={updateStateAndMapLayers}
      ref={mapRef}>
      {thefts && (
        <MapLayerOverlay visibleMapLayer={visibleMapLayer} thefts={thefts} />
      )}
    </MapView>
  );
}
