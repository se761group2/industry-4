/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AttemptLogin
// ====================================================

export interface AttemptLogin_attemptLogin_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface AttemptLogin_attemptLogin {
  __typename: "AttemptLoginResponse";
  code: string;
  success: boolean;
  message: string;
  user: AttemptLogin_attemptLogin_user | null;
}

export interface AttemptLogin {
  attemptLogin: AttemptLogin_attemptLogin | null;
}
