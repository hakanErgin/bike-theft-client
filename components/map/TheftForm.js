import React, {useState} from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';
// import DatePicker from './DatePicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Formik} from 'formik';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
});

export default function TheftForm() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, setFieldValue) => {
    setFieldValue('date', date);
    hideDatePicker();
  };

  return (
    <View>
      <Formik
        initialValues={{email: '', date: new Date()}}
        onSubmit={(values) => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Button onPress={handleSubmit} title="Submit" />
            <View>
              <Button title="Show Date Picker" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => handleConfirm(date, setFieldValue)}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
