import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 30,
  },
  form: {flex: 1, justifyContent: 'space-around'},
  header: {fontSize: 24, textAlign: 'center'},
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingBottom: 10,
    marginBottom: 10,
  },
});

export default styles;
