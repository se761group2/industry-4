/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: subscribeToMachine
// ====================================================

export interface subscribeToMachine_subscribeToMachine_user_machinesMaintaining {
  __typename: "Machine";
  id: string;
}

export interface subscribeToMachine_subscribeToMachine_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  machinesMaintaining: (subscribeToMachine_subscribeToMachine_user_machinesMaintaining | null)[] | null;
  surname: string | null;
  username: string | null;
}

export interface subscribeToMachine_subscribeToMachine {
  __typename: "MachineSubscriptionResponse";
  user: subscribeToMachine_subscribeToMachine_user | null;
}

export interface subscribeToMachine {
  subscribeToMachine: subscribeToMachine_subscribeToMachine | null;
}

export interface subscribeToMachineVariables {
  userID: string;
  machineID: string;
}
