import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import commonVariables from './commonVariables';

//  https://stackoverflow.com/a/65648357/7525593
//  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

export default async function setCurrentPosition(setPosition) {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (PermissionsAndroid.RESULTS.GRANTED === 'granted') {
    const {MY_POSITION_ZOOM_LEVEL} = commonVariables;

    function successCallback(position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: MY_POSITION_ZOOM_LEVEL,
        longitudeDelta: MY_POSITION_ZOOM_LEVEL,
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
