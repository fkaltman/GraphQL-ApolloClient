import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query GetUsers($limit: Int) {
    getAllUsers(limit: $limit) {
      id
      firstName
      email
      password
    }
  }
`;
