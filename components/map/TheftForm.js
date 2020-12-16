import React from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
});

export default function TheftForm() {
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(val) => onChange(val)}
            value={value}
          />
        )}
        name="description"
        rules={{required: true}}
        defaultValue="please describe your bike here"
      />
      {errors.description && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(val) => onChange(val)}
            value={value}
          />
        )}
        name="comments"
        defaultValue="comments here"
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
