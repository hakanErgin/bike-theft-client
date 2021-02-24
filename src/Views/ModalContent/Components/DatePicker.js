import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarIcon from 'react-native-vector-icons/Feather';
import commonStyles from '../../../Utils/commonStyles';

const DatePicker = ({setFieldValue, values}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateParam, setFieldValueParam) => {
    setFieldValueParam('date_details.date', dateParam);
    hideDatePicker();
  };

  return (
    <View>
      <View style={styles.calendarInputContainer}>
        <Text style={styles.calendarInputText}>
          {values.date_details.date.toDateString()}
        </Text>
        <CalendarIcon
          name="calendar"
          onPress={showDatePicker}
          style={styles.calendarIcon}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => handleConfirm(date, setFieldValue)}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  calendarInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: commonStyles.containerBackgroundColor.lightGray,
  },
  calendarInputText: {
    fontSize: commonStyles.fontSize.normal,
    color: 'black',
  },
  calendarIcon: {
    color: commonStyles.iconColor.darkRed,
    fontSize: commonStyles.iconSize.large,
  },
});
