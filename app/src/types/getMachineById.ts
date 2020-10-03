/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Status } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMachineById
// ====================================================

export interface getMachineById_machine_sensors_sampleChunks_samples {
  __typename: "Sample";
  value: number;
  timestamp: any;
}

export interface getMachineById_machine_sensors_sampleChunks {
  __typename: "SampleChunk";
  samples: getMachineById_machine_sensors_sampleChunks_samples[];
}

export interface getMachineById_machine_sensors {
  __typename: "Sensor";
  id: string;
  name: string;
  healthStatus: Status | null;
  unit: string;
  threshold: number | null;
  sampleChunks: getMachineById_machine_sensors_sampleChunks[];
}

export interface getMachineById_machine {
  __typename: "Machine";
  id: string;
  name: string;
  healthStatus: Status | null;
  image: string | null;
  sensors: getMachineById_machine_sensors[];
}

export interface getMachineById {
  machine: getMachineById_machine | null;
}

export interface getMachineByIdVariables {
  id: string;
}
