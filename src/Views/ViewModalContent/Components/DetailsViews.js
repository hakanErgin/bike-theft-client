import React from 'react';
import commonStyles from '../../../Utils/commonStyles';
import {View, StyleSheet, Image} from 'react-native';
import {NormalText, BoldText} from '../../../Utils/commonComponents';

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
      <BoldText style={styles.fieldHeader}>Date info</BoldText>
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
  return (
    <View style={styles.detailsContainer}>
      <BoldText style={styles.fieldHeader}>Bike info</BoldText>
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
              <Image
                key={img}
                source={{uri: img}}
                style={styles.imageThumbnail}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
export function OtherDetailsView({theftData}) {
  if (theftData.comments) {
    return (
      <View style={styles.detailsContainer}>
        <BoldText style={styles.fieldHeader}>Other</BoldText>
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
    backgroundColor: commonStyles.containerBackgroundColor.lightBlue,
    paddingVertical: commonStyles.gap[2],
    borderRadius: commonStyles.borderRadius.normal,
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  imageThumbnailContainer: {flexDirection: 'row'},
  imageThumbnail: {
    margin: commonStyles.gap[3],
    width: 75,
    height: 75,
    borderRadius: commonStyles.borderRadius.normal,
  },
  fieldName: {flex: 1, color: commonStyles.iconColor.darkRed},
  fieldValue: {flex: 1},
  fieldHeader: {
    flex: 1,
    marginBottom: commonStyles.gap[2],
    fontSize: commonStyles.fontSize.large,
    color: commonStyles.iconColor.darkRed,
  },
  fieldRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
