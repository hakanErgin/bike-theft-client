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
      // if (response.didCancel) {
      //   console.log('User cancelled camera picker');
      //   return;
      // } else if (response.errorCode === 'permission') {
      //   console.log('Permission not satisfied');
      //   return;
      // } else if (response.errorCode === 'others') {
      //   console.log(response.errorMessage);
      //   return;
      // }
      const file = new ReactNativeFile({
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      });
      setPickedImages((images) => [...images, file]);
    });
  };

  const removeFile = (imageToDelete) => {
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
            <TouchableOpacity
              key={img.uri}
              onPress={() => removeFile(img)}
              style={styles.imgButton}>
              <Image source={{uri: img.uri}} style={styles.image} />
            </TouchableOpacity>
          );
        })}
      {pickedImages.length < 3 && (
        <TouchableOpacity
          style={styles.addPhotoIconContainer}
          activeOpacity={0.25}
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
    fontSize: commonStyles.iconSize.xxl,
    marginLeft: commonStyles.gap[1],
    marginBottom: commonStyles.gap[1],
    color: commonStyles.iconColor.darkRed,
  },
  addPhotoIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonStyles.containerBackgroundColor.lightRed,
    borderRadius: commonStyles.borderRadius.normal,
    width: 75,
    height: 75,
    elevation: 2,
  },
  container: {
    marginBottom: commonStyles.gap[6],
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: commonStyles.borderRadius.normal,
  },
  imgButton: {
    elevation: 2,
    marginRight: commonStyles.gap[3],
    borderRadius: commonStyles.borderRadius.normal,
  },
});
