// https://aboutreact.com/example-of-image-picker-in-react-native/
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {useMutation} from '@apollo/client';
import {SINGLE_FILE_UPLOAD, MULTI_FILE_UPLOAD} from '../../../Utils/gql';
import {mediaClient} from '../../../ContextProviders/CombinedProviders';
import {ReactNativeFile} from 'apollo-upload-client';
import commonStyles from '../../../Utils/commonStyles';

const ImagePickerComponent = () => {
  const [pickedImages, setPickedImages] = useState([]);
  const [singleUpload] = useMutation(SINGLE_FILE_UPLOAD, {
    client: mediaClient,
    onCompleted: (res) => console.log(res),
  });
  const [multiUpload] = useMutation(MULTI_FILE_UPLOAD, {
    client: mediaClient,
    onCompleted: (res) => console.log(res),
  });

  const uploadImages = () => {
    pickedImages.length > 1
      ? multiUpload({variables: {files: pickedImages}})
      : singleUpload({variables: {file: pickedImages[0]}});
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
        // eslint-disable-next-line no-alert
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'permission') {
        // eslint-disable-next-line no-alert
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        // eslint-disable-next-line no-alert
        alert(response.errorMessage);
        return;
      }
      const file = new ReactNativeFile({
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      });
      setPickedImages((images) => [...images, file]);
    });
  };

  const removeFile = (imageToDelete) => {
    console.log(pickedImages);
    setPickedImages((images) => {
      return images.filter((image) => image.uri !== imageToDelete.uri);
    });
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {pickedImages &&
          pickedImages.length > 0 &&
          pickedImages.map((img) => {
            return (
              <TouchableOpacity key={img.uri} onPress={() => removeFile(img)}>
                <Image source={{uri: img.uri}} style={styles.imageStyle} />
              </TouchableOpacity>
            );
          })}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => uploadImages()}>
          <Text style={styles.textStyle}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ImagePickerComponent;

const {slide} = commonStyles;

const styles = StyleSheet.create({
  slide: {...slide},
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
    width: 75,
    height: 75,
    margin: 5,
  },
});
