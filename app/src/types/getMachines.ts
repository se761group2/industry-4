/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Status } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMachines
// ====================================================

export interface getMachines_machines {
  __typename: "Machine";
  id: string;
  name: string;
  healthStatus: Status | null;
  image: string | null;
}

export interface getMachines {
  machines: getMachines_machines[];
}
