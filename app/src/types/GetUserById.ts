/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserById
// ====================================================

export interface GetUserById_user {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface GetUserById {
  user: GetUserById_user | null;
}

export interface GetUserByIdVariables {
  id: string;
}
