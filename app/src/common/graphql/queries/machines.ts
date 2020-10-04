import { gql } from "@apollo/client";

export const GET_MACHINES = gql`
    query getMachines {
        machines {
            id
            name
            healthStatus
            image
        }
    }
`;

export const GET_MACHINE_BY_ID = gql`
    query getMachineById($id: ID!) {
        machine(id: $id) {
            name
            healthStatus
            image
            sensors {
                id
                name
                healthStatus
                unit
                threshold
                sampleChunks {
                    samples {
                        value
                        timestamp
                    }
                }
            }
        }
    }
`;
