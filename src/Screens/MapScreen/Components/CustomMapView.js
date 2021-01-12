import React, {useState, useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker, Heatmap, Callout} from 'react-native-maps';
import {useQuery, useMutation} from '@apollo/client';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '@env';
import TopBar from './TopBar';
import {GET_THEFTS, DELETE_THEFT} from '../../../Utils/gql';
import styles from '../../../styles';
import {useAddingTheft} from '../../../ContextProviders/AddingTheftContext';

const CustomMapView = ({setSelectedRegion, setIsModalVisible}) => {
  const mapRef = useRef();
  //https://github.com/react-native-maps/react-native-maps/issues/2010
  const [margin, setMargin] = useState(1);
  const [thefts, setThefts] = useState();
  const [initialRegion, setInitialRegion] = useState();
  const [currentRegionBoundaries, setCurrentRegionBoundaries] = useState();
  const [currentRegion, setCurrentRegion] = useState();
  const [nrOfTheftsInRegion, setNrOfTheftsInRegion] = useState();
  const [visibleMapLayer, setVisibleMapLayer] = useState('heatmap');

  const {loading: get_loading, error: get_error, data: get_data} = useQuery(
    GET_THEFTS,
  );
  const [
    submitDeleteMutation,
    {error: delete_error},
  ] = useMutation(DELETE_THEFT, {refetchQueries: [{query: GET_THEFTS}]});

  const isAddingNewTheft = useAddingTheft();

  //#region effects

  useEffect(() => {
    (async function () {
      return (
        mapRef.current != null &&
        mapRef.current
          .getMapBoundaries()
          .then((region) => setCurrentRegionBoundaries(region))
      );
    })();
  }, [currentRegion]);

  useEffect(() => {
    get_data && setThefts(get_data.findThefts.items);
  }, [get_data]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setInitialRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    if (currentRegionBoundaries != null && thefts != null) {
      const theftsInRegion = thefts.filter(
        (theft) =>
          theft.region.longitude >=
            currentRegionBoundaries.southWest.longitude &&
          theft.region.longitude <=
            currentRegionBoundaries.northEast.longitude &&
          theft.region.latitude >= currentRegionBoundaries.southWest.latitude &&
          theft.region.latitude <= currentRegionBoundaries.northEast.latitude,
      );
      setNrOfTheftsInRegion(theftsInRegion.length);
    }
  }, [thefts, currentRegionBoundaries]);

  if (get_loading) {
    return <Text>Loading...</Text>;
  }

  if (delete_error || get_error) {
    console.log(delete_error || get_error);
  }
  //#endregion

  //#region functions
  function onMapPress(theft) {
    if (isAddingNewTheft === true) {
      const {latitude, longitude} = currentRegion; // theft.nativeEvent.coordinate;
      const region = {latitude, longitude};
      setSelectedRegion(region);
      setIsModalVisible(true);
    }
  }

  const deleteTheft = (theftId) => () => {
    submitDeleteMutation({
      variables: {input: {_id: theftId}},
    });
  };

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

  function renderVisibleLayer() {
    if (visibleMapLayer === 'heatmap') {
      return <Heatmap points={thefts.map((t) => t.region)} />;
    } else if (visibleMapLayer === 'markers') {
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
    }
  }
  //#endregion

  return (
    <>
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
        {thefts && renderVisibleLayer()}
      </MapView>
      {isAddingNewTheft && <Text style={styles.crosshair}>+</Text>}
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
      <TopBar nr={nrOfTheftsInRegion} />
    </>
  );
};

export default CustomMapView;
