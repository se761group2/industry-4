import { gql } from "@apollo/client";

export const CREATE_SENSOR = gql`
    mutation createSensor($input: SensorInput) {
        createSensor(input: $input) {
            sensor {
                name
                healthStatus
                unit
                threshold
            }
        }
    }
`;

export const UPDATE_SENSOR = gql`
    mutation updateSensor($id: ID!, $machineID: ID!, $input: SensorUpdateInput) {
        updateSensor(id: $id, machineID: $machineID, input: $input) {
            sensor {
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
