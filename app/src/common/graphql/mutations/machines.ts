import { gql } from "@apollo/client";

export const CREATE_MACHINE = gql`
    mutation createMachine($name: String!) {
        createMachine(name: $name) {
            machine {
                id
                name
                healthStatus
            }
        }
    }
`;

export const UPDATE_MACHINE = gql`
    mutation updateMachine($id: ID!, $input: MachineUpdateInput) {
        updateMachine(input: $input) {
            machine {
                id
                name
                healthStatus
            }
        }
    }
`;
