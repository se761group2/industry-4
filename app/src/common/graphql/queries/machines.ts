import { gql } from "@apollo/client";

export const GET_MACHINES = gql`
    query getMachines() {
        machines {
            id
            name
            healthStatus
        }
    }
`;

export const GET_MACHINE_BY_ID = gql`
    query getMachineById($id: ID!) {
        machine(id: $id) {
            id
            name
            healthStatus
            sensors {
                id
                name
                healthStatus
                signals {
                    id
                    unit
                    threshold
                    values {
                        timestamp
                        timeStepSecs
                        samples
                    }
                }
            }
        }
    }
`;
