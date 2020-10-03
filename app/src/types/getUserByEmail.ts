/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserByEmail
// ====================================================

export interface getUserByEmail_user_email_machinesMaintaining {
  __typename: "Machine";
  id: string;
}

export interface getUserByEmail_user_email {
  __typename: "User";
  id: string;
  email: string;
  firstName: string | null;
  surname: string | null;
  machinesMaintaining: (getUserByEmail_user_email_machinesMaintaining | null)[] | null;
}

export interface getUserByEmail {
  user_email: getUserByEmail_user_email | null;
}

export interface getUserByEmailVariables {
  email: string;
}
