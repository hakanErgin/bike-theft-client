import {showMessage} from 'react-native-flash-message';

export async function submitForm(
  values,
  pickedImages,
  singleUpload,
  multiUpload,
  submitCreateMutation,
  selectedRegion,
  token,
) {
  const {longitude, latitude} = selectedRegion; // can use this to print location fetched from coords
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
            ...(values.bike_details.year && {year: values.bike_details.year}),
            ...(values.bike_details.frame_size && {
              frame_size: values.bike_details.frame_size,
            }),
            ...(values.bike_details.wheel_size && {
              wheel_size: values.bike_details.wheel_size,
            }),
            photos: photos,
          },
          ...(values.comments && {comments: values.comments}),
          date_time: {
            date: values.date_details.date,
            ...(values.date_details.time && {time: values.date_details.time}),
          },
          created_at: new Date(),
        },
        id_token: token,
      },
    });
  }
}

export function validate(values) {
  const errors = {};
  if (!values.bike_details.type) {
    errors.type = 'Bike type';
  }
  if (!values.bike_details.brand) {
    errors.brand = 'Bike brand';
  }
  if (!values.bike_details.color) {
    errors.color = 'Bike color';
  }
  handleValidationWarning(errors);
  return errors;
}

export function handleValidationWarning(errors) {
  let errorDescription = [];
  for (const [key, value] of Object.entries(errors)) {
    errorDescription.push(` ${value}`);
  }
  errorDescription.length > 0 &&
    showMessage({
      message: 'Required:',
      description: errorDescription.toString(),
      type: 'warning',
    });
}

export const initialValues = {
  date_details: {date: new Date(), time: undefined},
  bike_details: {
    type: undefined,
    brand: undefined,
    color: undefined,
    year: undefined,
    frame_size: undefined,
    wheel_size: undefined,
    photos: [],
  },
  comments: undefined,
};
