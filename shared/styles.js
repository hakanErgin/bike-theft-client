import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    textAlignVertical: 'top',
  },
  modal: {
    flex: 0.75,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 20,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {position: 'absolute', top: 15, left: 15},
});

export default styles;
