import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($email: String!) {
        user_email(email: $email) {
            id
            email
            firstName
            surname
            machinesMaintaining {
                id
            }
        }
    }
`;

export const GET_USER_BY_ID = gql`
    query getUserByID($id: ID!) {
        user(id: $id) {
            id
            email
            firstName
            surname
            machinesMaintaining {
                id
            }
        }
    }
`;
