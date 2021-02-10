// https://aboutreact.com/example-of-image-picker-in-react-native/
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ReactNativeFile} from 'apollo-upload-client';
import commonStyles from '../../../Utils/commonStyles';
import AddPhotoIcon from 'react-native-vector-icons/MaterialIcons';

const ImagePickerComponent = ({pickedImages, setPickedImages}) => {
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 1280,
      maxHeight: 1280,
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
    <View style={styles.container}>
      {pickedImages &&
        pickedImages.length > 0 &&
        pickedImages.map((img) => {
          return (
            <TouchableOpacity key={img.uri} onPress={() => removeFile(img)}>
              <Image source={{uri: img.uri}} style={styles.imageStyle} />
            </TouchableOpacity>
          );
        })}
      {pickedImages.length < 3 && (
        <TouchableOpacity
          style={styles.addPhotoIconContainer}
          activeOpacity={0.5}
          onPress={() => chooseFile('photo')}>
          <AddPhotoIcon
            name="add-photo-alternate"
            style={styles.addPhotoIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  addPhotoIcon: {
    fontSize: 50,
    color: commonStyles.iconColor.darkRed,
  },
  addPhotoIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    margin: 5,
    borderRadius: 10,
    width: 75,
    height: 75,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 75,
    height: 75,
    margin: 5,
    borderRadius: 10,
  },
});
