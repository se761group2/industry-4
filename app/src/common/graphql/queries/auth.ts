import { gql } from "@apollo/client";

export const ATTEMPT_LOGIN_MUTATION = gql`
    mutation AttemptLogin {
        attemptLogin @client {
            code
            success
            message
            user {
                id
                email
            }
        }
    }
`;
