import {gql} from '@apollo/client';

export const CREATE_THEFT = gql`
  mutation($input: CreateTheftInput!) {
    createTheft(input: $input) {
      _id
    }
  }
`;

export const GET_THEFTS = gql`
  {
    findThefts {
      items {
        _id
        bike_description
        comments
        date
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

export const CREATE_USER_OR_SIGN_IN = gql`
  mutation($id_token: String!) {
    createUserOrSignIn(id_token: $id_token) {
      google_name
    }
  }
`;
