import React, {useState} from 'react';
import {View, Button} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({setFieldValue}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateParam, setFieldValueParam) => {
    setFieldValueParam('date', dateParam);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Choose date" onPress={showDatePicker} />
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
