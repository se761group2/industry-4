import { gql } from "@apollo/client";

export const GET_SENSOR_BY_ID = gql`
    query getSensorById($id: ID!) {
        sensor(id: $id) {
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
`;
