import { gql } from "@apollo/client";

export const GET_SENSOR_BY_ID = gql`
    query getSensorById($id: ID!) {
        sensor(id: $id) {
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
`;
