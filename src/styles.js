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
  crosshair: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 50,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  menuBtnContainer: {position: 'absolute', top: 15, left: 15},
  header: {fontSize: 24, textAlign: 'center'},
  googleBtnContainer: {position: 'absolute', top: 15, right: 15},
  topBarContainer: {
    position: 'absolute',
    left: 100,
    right: 100,
    bottom: 15,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  trafficLight: {
    borderRadius: 10,
    backgroundColor: 'red',
    zIndex: 10,
    marginLeft: 8,
    width: 20,
    height: 20,
  },
  drawerContainer: {padding: 10},
  searchBoxContainer: {
    zIndex: 10,
    flex: 1,
    position: 'absolute',
    top: 100,
    width: '100%',
  },
});

export default styles;