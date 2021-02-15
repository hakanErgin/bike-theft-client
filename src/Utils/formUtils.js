import {GoogleSignin} from '@react-native-community/google-signin';
import {showMessage} from 'react-native-flash-message';

export async function submitForm(
  values,
  pickedImages,
  singleUpload,
  multiUpload,
  submitCreateMutation,
  selectedRegion,
  setIsFormModalVisible,
  setIsAddingNewTheft,
) {
  const currentToken = await GoogleSignin.getTokens();
  const {longitude, latitude} = selectedRegion; // can use this to print location fetched from coords

  console.log({pickedImages});
  if (pickedImages.length > 1) {
    multiUpload({
      variables: {files: pickedImages},
    }).then((result) => submitWithImages(result));
  } else if (pickedImages.length === 1) {
    singleUpload({variables: {file: pickedImages[0]}}).then((result) =>
      submitWithImages(result),
    );
  } else {
    submitWithImages();
  }

  function submitWithImages(params) {
    let photos = [];
    if (params) {
      const photoData = Object.keys(params.data)[0];
      console.log(photoData);
      Array.isArray(params.data[photoData])
        ? params.data[photoData].map((photo) => photos.push(photo.url))
        : (photos = params.data[photoData].url);
    }
    submitCreateMutation({
      variables: {
        input: {
          region: {latitude, longitude},
          bike: {
            type: values.bike_details.type,
            brand: values.bike_details.brand,
            color: values.bike_details.color,
            year: values.bike_details.year,
            frame_size: values.bike_details.frame_size,
            wheel_size: values.bike_details.wheel_size,
            photos: photos,
          },
          comments: values.comments,
          date_time: {
            date: values.date_details.date,
            time: values.date_details.time,
          },
          created_at: new Date(),
        },
        id_token: currentToken.idToken,
      },
    });
  }
  setIsFormModalVisible(false);
  setIsAddingNewTheft(false);
}

export function validate(values) {
  const errors = {};
  if (values.bike_details.type === 'Not Specified') {
    errors.type = 'Bike type';
  }
  if (values.bike_details.brand === 'Not Specified') {
    errors.brand = 'Bike brand';
  }
  if (values.bike_details.color === 'Not Specified') {
    errors.color = 'Bike color';
  }
  return errors;
}

export const initialValues = {
  date_details: {date: new Date(), time: 'Not Specified'},
  bike_details: {
    type: 'Not Specified',
    brand: 'Not Specified',
    color: 'Not Specified',
    year: 'Not Specified',
    frame_size: 'Not Specified',
    wheel_size: 'Not Specified',
    photos: ['Not Specified'],
  },
  comments: 'Not Specified',
};

export function showValidationWarning(errors) {
  let errorDescription = [];
  for (const [key, value] of Object.entries(errors)) {
    errorDescription.push(` ${value}`);
  }
  showMessage({
    message: 'Required:',
    description: errorDescription.toString(),
    type: 'warning',
  });
}
