import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingBottom: 10,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingBottom: 10,
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 30,
  },
  form: {flex: 1, justifyContent: 'space-around'},
  map: {
    flex: 1,
  },
  addBtnContainer: {position: 'absolute', top: 15, left: 15},
  header: {fontSize: 24, textAlign: 'center'},
  button: {},
});

export default styles;
