const commonStyles = {
  // globals
  borderRadius: {small: 6, normal: 10, large: 15, xl: 30},
  fontSize: {tiny: 6, small: 10, normal: 14, large: 18, xl: 24},
  iconSize: {normal: 15, large: 20, larger: 30, xl: 42, xxl: 62},
  iconColor: {darkRed: '#900', lightGrey: '#E5E5E5', white: 'white'},
  containerBackgroundColor: {
    light: 'white',
    dark: 'black',
    lightGray: '#E5E5E5',
    gray: '#c9c9c9',
    lightBlue: '#e8efff',
  },
  // can use for margin/padding
  gap: [2, 4, 8, 12, 16, 22, 28, 36],
};

export default commonStyles;

export const inputAndroid = {
  fontSize: commonStyles.fontSize.normal,
  padding: commonStyles.gap[2],
  borderWidth: 1,
  borderRadius: commonStyles.borderRadius.normal,
  color: 'black',
  borderColor: commonStyles.containerBackgroundColor.lightGray,
  paddingRight: commonStyles.gap[6], // to ensure the text is never behind the icon
};
