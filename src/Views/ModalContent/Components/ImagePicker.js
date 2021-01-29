// https://aboutreact.com/example-of-image-picker-in-react-native/
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {useMutation} from '@apollo/client';
import {SINGLE_FILE_UPLOAD} from '../../../Utils/gql';
import {mediaClient} from '../../../ContextProviders/CombinedProviders';
import {ReactNativeFile} from 'apollo-upload-client';

const ImagePickerComponent = () => {
  const [pickedImage, setPickedImage] = useState({});
  const [lastUploaded, setLastUploaded] = useState({});
  const [mutate, {loading, error, data}] = useMutation(SINGLE_FILE_UPLOAD, {
    client: mediaClient,
    onCompleted: (res) => console.log(res),
  });

  const onUpload = () => {
    mutate({variables: {file: pickedImage}});
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 1024,
      maxHeight: 1024,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      const file = new ReactNativeFile({
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      });
      setPickedImage(file);
    });
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Image source={{uri: pickedImage.uri}} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{pickedImage.uri}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => onUpload()}>
          <Text style={styles.textStyle}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
