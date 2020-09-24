/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SensorUpdateInput, Status } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateSensor
// ====================================================

export interface updateSensor_updateSensor_sensor_sampleChunks_samples {
  __typename: "Sample";
  value: number;
  timestamp: any;
}

export interface updateSensor_updateSensor_sensor_sampleChunks {
  __typename: "SampleChunk";
  samples: updateSensor_updateSensor_sensor_sampleChunks_samples[];
}

export interface updateSensor_updateSensor_sensor {
  __typename: "Sensor";
  name: string;
  healthStatus: Status | null;
  unit: string;
  threshold: number | null;
  sampleChunks: updateSensor_updateSensor_sensor_sampleChunks[];
}

export interface updateSensor_updateSensor {
  __typename: "SensorUpdatedResponse";
  sensor: updateSensor_updateSensor_sensor | null;
}

export interface updateSensor {
  updateSensor: updateSensor_updateSensor | null;
}

export interface updateSensorVariables {
  id: string;
  machineID: string;
  input?: SensorUpdateInput | null;
}
