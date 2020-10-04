import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser($email: String!) {
        createUser(email: $email) {
            user {
                id
                email
                firstName
                machinesMaintaining {
                    id
                }
                surname
                username
            }
        }
    }
`;

export const SUBSCRIBE_TO_MACHINE = gql`
    mutation subscribeToMachine($userID: ID!, $machineID: ID!) {
        subscribeToMachine(userID: $userID, machineID: $machineID) {
            user {
                id
                email
                firstName
                machinesMaintaining {
                    id
                }
                surname
                username
            }
        }
    }
`;

export const UNSUBSCRIBE_FROM_MACHINE = gql`
    mutation unsubscribeFromMachine($userID: ID!, $machineID: ID!) {
        unsubscribeFromMachine(userID: $userID, machineID: $machineID) {
            user {
                id
                email
                firstName
                machinesMaintaining {
                    id
                }
                surname
                username
            }
        }
    }
`;
