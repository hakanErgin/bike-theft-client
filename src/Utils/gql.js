import {gql} from '@apollo/client';

export const CREATE_THEFT = gql`
  mutation($id_token: String!, $input: CreateTheftInput!) {
    createTheft(id_token: $id_token, input: $input) {
      _id
      bike {
        photos
      }
    }
  }
`;

export const CREATE_USER_OR_SIGN_IN = gql`
  mutation($id_token: String!) {
    createUserOrSignIn(id_token: $id_token) {
      google_name
    }
  }
`;

export const GET_USERS_THEFTS = gql`
  query($id_token: String!) {
    getUsersReportedThefts(id_token: $id_token) {
      _id
      created_at
      bike {
        brand
      }
      region {
        latitude
        longitude
      }
    }
  }
`;

export const GET_THEFTS = gql`
  {
    findThefts {
      items {
        _id
        created_at
        region {
          latitude
          longitude
        }
      }
    }
  }
`;

export const GET_THEFT = gql`
  query($id: GraphbackObjectID!) {
    getTheft(id: $id) {
      _id
      user {
        google_id
      }
      userId
      region {
        latitude
        longitude
      }
      bike {
        type
        brand
        year
        frame_size
        wheel_size
        photos
      }
      comments
      created_at
      date_time {
        date
        time
      }
    }
  }
`;

export const DELETE_THEFT = gql`
  mutation(
    $id_token: String!
    $theftId: GraphbackObjectID!
    $theftUserId: GraphbackObjectID!
  ) {
    deleteTheft(
      id_token: $id_token
      theftId: $theftId
      theftUserId: $theftUserId
    ) {
      _id
    }
  }
`;

export const CREATE_FEEDBACK = gql`
  mutation($type: String!, $description: String!) {
    createFeedback(type: $type, description: $description) {
      type
      description
    }
  }
`;

export const SINGLE_FILE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export const MULTI_FILE_UPLOAD = gql`
  mutation($files: [Upload!]!) {
    multipleUpload(files: $files) {
      filename
      mimetype
      encoding
      url
    }
  }
`;
