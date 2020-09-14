import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
    query GetUserById($id: ID!) {
        user(id: $id) {
            id
            username
            email
            phoneNumber
        }
    }
`;
