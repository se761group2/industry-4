import { gql } from "@apollo/client";

export const UPDATE_SENSOR = gql`
    mutation updateSensor($id: ID!, $input: SensorUpdateInput) {
        updateSensor(id: $id, input: $input) {
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
