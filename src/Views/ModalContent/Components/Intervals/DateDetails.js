import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import DatePicker from '../DatePicker';
import commonStyles, {inputAndroid} from '../../../../Utils/commonStyles';
import RNPickerSelect from 'react-native-picker-select';
import theftFields from '../../../../Utils/theftFields';
import DownArrowIcon from 'react-native-vector-icons/AntDesign';

function InfoBox() {
  const [isInfoCollapsed, setIsInfoCollapsed] = useState(false);

  function toggleIsInfoCollapsed() {
    setIsInfoCollapsed((val) => !val);
  }
  return (
    <Pressable onPress={toggleIsInfoCollapsed}>
      <View style={styles.infoContainer}>
        <DownArrowIcon
          name={!isInfoCollapsed ? 'right' : 'down'}
          style={styles.collapseArrow}
        />
        {isInfoCollapsed ? (
          <View style={styles.info}>
            <Text style={styles.infoText}>
              Here you can provide info about your stolen bike.
            </Text>
            <Text style={styles.infoText}>
              Some fields are required, such as date. Today's date is selected
              by default.
            </Text>
            <Text style={styles.infoText}>
              When done with date details, swipe right second screen for your
              bike details, such as brand or color of your stolen bike.
            </Text>
            <Text style={styles.infoText}>
              You may also add any other comments on the last(third) screen.
            </Text>
          </View>
        ) : (
          <View>
            <Text>Tap for info</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export const DateDetails = ({setFieldValue, values}) => {
  const changeTimeOfDay = (dateParam, setFieldValueParam) => {
    setFieldValueParam('date_details.time', dateParam);
  };

  return (
    <View style={styles.slide}>
      <InfoBox />
      <View>
        <Text>{theftFields.date_time.date.Question}</Text>
        <Text style={styles.requiredText}>*required</Text>
        <DatePicker setFieldValue={setFieldValue} values={values} />
      </View>
      <View>
        <Text>{theftFields.date_time.time.Question}</Text>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => changeTimeOfDay(value, setFieldValue)}
          style={styles}
          items={theftFields.date_time.time.Options.map((option) => {
            return {label: option, value: option};
          })}
        />
      </View>
    </View>
  );
};

export default DateDetails;

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: commonStyles.gap[5],
    paddingBottom: commonStyles.gap[3],
    paddingTop: commonStyles.gap[6],
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'space-evenly',
  },
  inputAndroid: {
    ...inputAndroid,
  },
  infoContainer: {
    backgroundColor: commonStyles.containerBackgroundColor.lightBlue,
    paddingHorizontal: commonStyles.gap[3],
    paddingVertical: commonStyles.gap[1],
    borderRadius: commonStyles.borderRadius.large,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoText: {
    textAlign: 'center',
    marginBottom: commonStyles.gap[2],
  },
  collapseArrow: {fontSize: 20},
  requiredText: {
    fontSize: commonStyles.fontSize.small,
    color: 'black',
    fontStyle: 'italic',
    position: 'absolute',
    right: 0,
  },
});
