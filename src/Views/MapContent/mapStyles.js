import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
  statusBarContainer: {
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
  searchBoxContainer: {
    zIndex: 10,
    flex: 1,
    position: 'absolute',
    top: 100,
    width: '100%',
  },
});

export default styles;
