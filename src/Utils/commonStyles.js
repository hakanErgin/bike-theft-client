const commonStyles = {
  // globals
  borderRadius: {small: 6, normal: 10, large: 15},
  fontSize: {tiny: 7, small: 10, normal: 14, large: 20, xl: 24},
  iconSize: {normal: 15, large: 20, xl: 42, xxl: 62},
  iconColor: {darkRed: '#900'},
  containerBackgroundColor: {light: 'white', dark: 'black'},
  // can use for margin/padding
  gap: [4, 8, 12, 16, 22, 28, 36],
};

export default commonStyles;

export const inputAndroid = {
  fontSize: commonStyles.fontSize.normal,
  paddingHorizontal: commonStyles.gap[1],
  paddingVertical: commonStyles.gap[1],
  borderWidth: 1,
  borderRadius: commonStyles.borderRadius.normal,
  color: 'black',
  borderColor: 'gray',
  paddingRight: commonStyles.gap[5], // to ensure the text is never behind the icon
};
