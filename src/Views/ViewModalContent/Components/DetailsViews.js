import React from 'react';
import commonStyles from '../../../Utils/commonStyles';
import {Text, View, StyleSheet, Image} from 'react-native';

export function FieldRow({field, value}) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldName}>{field}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

export function DateDetailsView({theftData}) {
  const dateCreated = new Date(theftData.created_at);
  const dateStolen = new Date(theftData.date_time.date);

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.fieldHeader}>Date info</Text>
      <FieldRow field={'Reported on:'} value={dateCreated.toDateString()} />
      <FieldRow field={'Date stolen:'} value={dateStolen.toDateString()} />
      <FieldRow field={'Time of the day:'} value={theftData.date_time.time} />
    </View>
  );
}

export function BikeDetailsView({theftData}) {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.fieldHeader}>Bike info</Text>
      <FieldRow field={'Type:'} value={theftData.bike.type} />
      <FieldRow field={'Brand:'} value={theftData.bike.brand} />
      <FieldRow field={'Manufacture year:'} value={theftData.bike.year} />
      <FieldRow field={'Frame size:'} value={theftData.bike.frame_size} />
      <FieldRow field={'Wheel size:'} value={theftData.bike.wheel_size} />
      {theftData.bike.photos.length > 0 && (
        <View style={styles.imageThumbnailContainer}>
          {theftData.bike.photos.map((img) => {
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
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.fieldHeader}>Other</Text>
      <FieldRow field={'Comments:'} value={theftData.comments} />
    </View>
  );
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