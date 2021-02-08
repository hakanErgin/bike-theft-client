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
      region {
        latitude
        longitude
      }
    }
  }
`;

export const DELETE_THEFT = gql`
  mutation($input: MutateTheftInput!) {
    deleteTheft(input: $input) {
      _id
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
