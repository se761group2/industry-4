import { gql } from "@apollo/client";

export const GET_SENSOR_BY_ID = gql`
    query getSensorById($machineId: ID!, $id: ID!) {
        sensor(machineId: $machineId, id: $id) {
            name
            healthStatus
            notificationStatus
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
