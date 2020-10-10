/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MachineUpdateInput, Status } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateMachine
// ====================================================

export interface updateMachine_updateMachine_machine {
  __typename: "Machine";
  id: string;
  name: string;
  healthStatus: Status | null;
  subscribers: (string | null)[] | null;
  image: string | null;
}

export interface updateMachine_updateMachine {
  __typename: "MachineUpdatedResponse";
  machine: updateMachine_updateMachine_machine | null;
}

export interface updateMachine {
  updateMachine: updateMachine_updateMachine | null;
}

export interface updateMachineVariables {
  id: string;
  input?: MachineUpdateInput | null;
}
