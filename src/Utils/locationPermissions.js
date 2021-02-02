import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

//  https://stackoverflow.com/a/65648357/7525593
//  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

export default async function setCurrentPosition(setPosition, ZOOM_LEVEL) {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (PermissionsAndroid.RESULTS.GRANTED === 'granted') {
    function successCallback(position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: ZOOM_LEVEL,
        longitudeDelta: ZOOM_LEVEL,
      });
    }
    Geolocation.getCurrentPosition(
      successCallback,
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
}
