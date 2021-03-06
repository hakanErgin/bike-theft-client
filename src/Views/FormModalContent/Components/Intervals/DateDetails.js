import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import DatePicker from '../DatePicker';
import commonStyles, {inputAndroid} from '../../../../Utils/commonStyles';
import RNPickerSelect from 'react-native-picker-select';
import theftFields from '../../../../Utils/theftFields';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import {NormalText, BoldText} from '../../../../Utils/commonComponents';

function InfoBox() {
  const [isInfoCollapsed, setIsInfoCollapsed] = useState(false);

  function toggleIsInfoCollapsed() {
    setIsInfoCollapsed((val) => !val);
  }

  const infoMessage = !isInfoCollapsed ? 'Information' : 'Tap to collapse';

  return (
    <Pressable onPress={toggleIsInfoCollapsed}>
      <View style={styles.infoContainer}>
        {isInfoCollapsed && (
          <View>
            <NormalText style={styles.infoText}>
              Here you can provide info about your stolen bike.
            </NormalText>
            <NormalText style={styles.infoText}>
              Some fields are required such as date. Today's date is selected by
              default.
            </NormalText>
            <NormalText style={styles.infoText}>
              When done with date details, swipe right to the second screen for
              your bike details, such as brand or color. Or add photos of your
              bike!
            </NormalText>
            <NormalText style={styles.infoText}>
              You may also add any other comments on the last(third) screen.
            </NormalText>
          </View>
        )}
        <NormalText style={styles.informationText}>{infoMessage}</NormalText>
        <ArrowIcon
          name={!isInfoCollapsed ? 'left' : 'up'}
          style={styles.collapseArrow}
        />
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
        <NormalText>
          {theftFields.date_time.date.Question}
          <BoldText style={styles.requiredText}>*</BoldText>
        </NormalText>
        <DatePicker setFieldValue={setFieldValue} values={values} />
      </View>
      <View>
        <NormalText>{theftFields.date_time.time.Question}</NormalText>
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
    backgroundColor: commonStyles.containerBackgroundColor.lightRed,
    paddingHorizontal: commonStyles.gap[3],
    paddingVertical: commonStyles.gap[1],
    borderRadius: commonStyles.borderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: commonStyles.gap[1],
    color: 'black',
  },
  collapseArrow: {
    alignSelf: 'flex-end',
    fontSize: commonStyles.iconSize.normal,
    color: commonStyles.iconColor.darkRed,
  },
  requiredText: {
    color: commonStyles.iconColor.darkRed,
    fontSize: commonStyles.fontSize.normal,
  },
  informationText: {
    color: commonStyles.iconColor.darkRed,
  },
});
