/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SensorInput, NotificationStatus, Status } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createSensor
// ====================================================

export interface createSensor_createSensor_sensor {
  __typename: "Sensor";
  name: string;
  notificationStatus: NotificationStatus | null;
  healthStatus: Status | null;
  unit: string;
  threshold: number | null;
}

export interface createSensor_createSensor {
  __typename: "SensorCreationResponse";
  sensor: createSensor_createSensor_sensor | null;
}

export interface createSensor {
  createSensor: createSensor_createSensor | null;
}

export interface createSensorVariables {
  input?: SensorInput | null;
}
