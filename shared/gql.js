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

export const DELETE_THEFT = gql`
  mutation($input: MutateTheftInput!) {
    deleteTheft(input: $input) {
      _id
    }
  }
`;