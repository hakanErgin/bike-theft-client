const commonStyles = {
  // globals
  borderRadius: {small: 6, normal: 10, large: 15, xl: 30},
  fontSize: {tiny: 9, small: 12, normal: 14, large: 18, xl: 24},
  iconSize: {normal: 15, large: 20, larger: 30, xl: 42, xxl: 62},
  iconColor: {darkRed: '#900', lightGrey: '#E5E5E5', white: 'white'},
  containerBackgroundColor: {
    light: 'white',
    dark: 'black',
    lightGray: '#E5E5E5',
    gray: '#c9c9c9',
    lightRed: '#fcfaf4',
  },
  // can use for margin/padding
  gap: [2, 4, 8, 12, 16, 22, 28, 36, 48],
  hitSlop: [5, 7.5, 10, 15, 20],
};

export default commonStyles;

export const inputAndroid = {
  fontFamily: 'AlteHaasGroteskRegular',
  fontSize: commonStyles.fontSize.normal,
  padding: commonStyles.gap[1],
  marginVertical: commonStyles.gap[0],
  borderWidth: 1,
  borderRadius: commonStyles.borderRadius.normal,
  color: 'black',
  borderColor: commonStyles.containerBackgroundColor.lightGray,
};
