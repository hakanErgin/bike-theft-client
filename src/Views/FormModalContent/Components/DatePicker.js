import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
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
      <Pressable style={styles.calendarInputContainer} onPress={showDatePicker}>
        <Text style={styles.calendarInputText}>
          {values.date_details.date.toDateString()}
        </Text>
        <CalendarIcon name="calendar" style={styles.calendarIcon} />
      </Pressable>
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
    padding: commonStyles.gap[2],
    borderWidth: 1,
    borderRadius: commonStyles.borderRadius.normal,
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
