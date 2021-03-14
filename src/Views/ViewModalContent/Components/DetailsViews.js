import React, {useState} from 'react';
import commonStyles from '../../../Utils/commonStyles';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {NormalText, BoldText} from '../../../Utils/commonComponents';
import Modal from 'react-native-modal';
import ImageZoom from 'react-native-image-pan-zoom';

export function FieldRow({field, value}) {
  return (
    <View style={styles.fieldRow}>
      <BoldText style={styles.fieldName}>{field}</BoldText>
      <NormalText style={styles.fieldValue}>{value}</NormalText>
    </View>
  );
}

export function DateDetailsView({theftData}) {
  const dateCreated = new Date(theftData.created_at);
  const dateStolen = new Date(theftData.date_time.date);

  return (
    <View style={styles.detailsContainer}>
      <NormalText style={styles.fieldHeader}>Date info</NormalText>
      <FieldRow field={'Reported on:'} value={dateCreated.toDateString()} />
      <FieldRow field={'Date stolen:'} value={dateStolen.toDateString()} />
      {theftData.date_time.time && (
        <FieldRow field={'Time of the day:'} value={theftData.date_time.time} />
      )}
    </View>
  );
}

export function BikeDetailsView({theftData}) {
  const {
    type,
    brand,
    color,
    year,
    frame_size,
    wheel_size,
    photos,
  } = theftData.bike;
  const [isImgModalVisible, setIsImgModalVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  function displayImage(img) {
    setSelectedImg(img);
    setIsImgModalVisible(true);
  }

  return (
    <View style={styles.detailsContainer}>
      <NormalText style={styles.fieldHeader}>Bike info</NormalText>
      <FieldRow field={'Type:'} value={type} />
      <FieldRow field={'Brand:'} value={brand} />
      <FieldRow field={'Color:'} value={color} />
      {year && <FieldRow field={'Manufacture year:'} value={year} />}
      {frame_size && <FieldRow field={'Frame size:'} value={frame_size} />}
      {wheel_size && <FieldRow field={'Wheel size:'} value={wheel_size} />}
      {photos.length > 0 && (
        <View style={styles.imageThumbnailContainer}>
          {photos.map((img) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  displayImage(img);
                }}
                key={img}>
                <Image source={{uri: img}} style={styles.imageThumbnail} />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {isImgModalVisible && (
        <Modal
          transparent
          backdropOpacity={0.9}
          isVisible={isImgModalVisible}
          style={styles.modal}>
          <ImageZoom
            cropWidth={windowWidth}
            cropHeight={windowHeight}
            imageWidth={windowWidth}
            imageHeight={windowHeight}
            onClick={() => setIsImgModalVisible(false)}>
            <Image source={{uri: selectedImg}} style={styles.imageLarge} />
          </ImageZoom>
          <NormalText style={styles.imageModalInstructions}>
            Tap to close
          </NormalText>
        </Modal>
      )}
    </View>
  );
}
export function OtherDetailsView({theftData}) {
  if (theftData.comments) {
    return (
      <View style={styles.detailsContainer}>
        <NormalText style={styles.fieldHeader}>Other</NormalText>
        <FieldRow field={'Comments:'} value={theftData.comments} />
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: commonStyles.containerBackgroundColor.lightRed,
    paddingVertical: commonStyles.gap[2],
    borderRadius: commonStyles.borderRadius.normal,
    alignItems: 'center',
    marginVertical: commonStyles.gap[2],
    paddingHorizontal: 10,
    elevation: 1,
  },
  imageThumbnailContainer: {flexDirection: 'row'},
  imageThumbnail: {
    margin: commonStyles.gap[3],
    width: 75,
    height: 75,
    borderRadius: commonStyles.borderRadius.normal,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLarge: {flex: 1, resizeMode: 'contain'},
  imageModalInstructions: {
    color: 'white',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    paddingHorizontal: commonStyles.gap[2],
    paddingVertical: commonStyles.gap[1],
    borderRadius: commonStyles.borderRadius.small,
    fontSize: commonStyles.fontSize.small,
  },
  fieldName: {flex: 1, color: commonStyles.iconColor.darkRed},
  fieldValue: {flex: 1},
  fieldHeader: {
    flex: 1,
    fontSize: commonStyles.fontSize.large,
    color: commonStyles.iconColor.darkRed,
  },
  fieldRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
