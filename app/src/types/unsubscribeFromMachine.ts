/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unsubscribeFromMachine
// ====================================================

export interface unsubscribeFromMachine_unsubscribeFromMachine_user_machinesMaintaining {
  __typename: "Machine";
  id: string;
}

export interface unsubscribeFromMachine_unsubscribeFromMachine_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  machinesMaintaining: (unsubscribeFromMachine_unsubscribeFromMachine_user_machinesMaintaining | null)[] | null;
  surname: string | null;
  username: string | null;
}

export interface unsubscribeFromMachine_unsubscribeFromMachine {
  __typename: "MachineSubscriptionResponse";
  user: unsubscribeFromMachine_unsubscribeFromMachine_user | null;
}

export interface unsubscribeFromMachine {
  unsubscribeFromMachine: unsubscribeFromMachine_unsubscribeFromMachine | null;
}

export interface unsubscribeFromMachineVariables {
  userID: string;
  machineID: string;
}
