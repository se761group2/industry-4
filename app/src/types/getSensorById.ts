/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Status, NotificationStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getSensorById
// ====================================================

export interface getSensorById_sensor_sampleChunks_samples {
  __typename: "Sample";
  value: number;
  timestamp: any;
}

export interface getSensorById_sensor_sampleChunks {
  __typename: "SampleChunk";
  samples: getSensorById_sensor_sampleChunks_samples[];
}

export interface getSensorById_sensor {
  __typename: "Sensor";
  name: string;
  healthStatus: Status | null;
  notificationStatus: NotificationStatus | null;
  unit: string;
  threshold: number | null;
  sampleChunks: getSensorById_sensor_sampleChunks[];
}

export interface getSensorById {
  sensor: getSensorById_sensor | null;
}

export interface getSensorByIdVariables {
  machineId: string;
  id: string;
}
