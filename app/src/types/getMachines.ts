/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationStatus, Status } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMachines
// ====================================================

export interface getMachines_machines {
  __typename: "Machine";
  id: string;
  name: string;
  subscribers: (string | null)[] | null;
  notificationStatus: NotificationStatus | null;
  healthStatus: Status | null;
  image: string | null;
}

export interface getMachines {
  machines: getMachines_machines[];
}
