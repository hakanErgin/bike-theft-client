const commonStyles = {
  // globals
  borderRadius: {normal: 10},
  textSize: {normal: 14},
  iconSize: {normal: 15, large: 25, xl: 42},
  iconColor: {darkRed: '#900'},
  // carousel slide shared components
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingBottom: 10,
    marginBottom: 10,
    width: '100%',
  },
};

export default commonStyles;
