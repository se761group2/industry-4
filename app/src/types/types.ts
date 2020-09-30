export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type Query = {
    __typename?: "Query";
    user?: Maybe<User>;
    machines: Array<Machine>;
    machine?: Maybe<Machine>;
    sensor?: Maybe<Sensor>;
};

export type QueryUserArgs = {
    id: Scalars["ID"];
};

export type QueryMachineArgs = {
    id: Scalars["ID"];
};

export type QuerySensorArgs = {
    machineId: Scalars["ID"];
    id: Scalars["ID"];
};

export type User = {
    __typename?: "User";
    id: Scalars["ID"];
    username: Scalars["String"];
    email: Scalars["String"];
    phoneNumber: Scalars["String"];
};

export type Machine = {
    __typename?: "Machine";
    id: Scalars["ID"];
    name: Scalars["String"];
    healthStatus?: Maybe<Status>;
    image: Scalars["String"];
    sensors: Array<Sensor>;
};

export enum Status {
    Nominal = "Nominal",
    Moderate = "Moderate",
    Critical = "Critical",
}

export type Sensor = {
    __typename?: "Sensor";
    id: Scalars["ID"];
    machineId: Scalars["ID"];
    name: Scalars["String"];
    healthStatus?: Maybe<Status>;
    notificationStatus?: Maybe<NotificationStatus>;
    threshold?: Maybe<Scalars["Float"]>;
    unit: Scalars["String"];
    sampleChunks: Array<SampleChunk>;
};

export enum NotificationStatus {
    Working = "Working",
    Unacknowledged = "Unacknowledged",
    Acknowledged = "Acknowledged",
}

export type SampleChunk = {
    __typename?: "SampleChunk";
    id: Scalars["ID"];
    samples: Array<Sample>;
};

export type Sample = {
    __typename?: "Sample";
    timestamp: Scalars["Date"];
    value: Scalars["Float"];
};

export type Mutation = {
    __typename?: "Mutation";
    updateUser?: Maybe<MutationResponse>;
    updateMachine?: Maybe<MachineUpdatedResponse>;
    updateSensor?: Maybe<SensorUpdatedResponse>;
    createMachine?: Maybe<MachineCreationResponse>;
    createSensor?: Maybe<SensorCreationResponse>;
};

export type MutationUpdateUserArgs = {
    id: Scalars["ID"];
};

export type MutationUpdateMachineArgs = {
    id: Scalars["ID"];
    input?: Maybe<MachineUpdateInput>;
};

export type MutationUpdateSensorArgs = {
    id: Scalars["ID"];
    machineID: Scalars["ID"];
    input?: Maybe<SensorUpdateInput>;
};

export type MutationCreateMachineArgs = {
    name: Scalars["String"];
    image: Scalars["String"];
};

export type MutationCreateSensorArgs = {
    input?: Maybe<SensorInput>;
};

export type MutationResponse = {
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
};

export type MachineUpdateInput = {
    name?: Maybe<Scalars["String"]>;
    healthStatus?: Maybe<Status>;
    image?: Maybe<Scalars["String"]>;
};

export type MachineUpdatedResponse = MutationResponse & {
    __typename?: "MachineUpdatedResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    machine?: Maybe<Machine>;
};

export type SensorUpdateInput = {
    name?: Maybe<Scalars["String"]>;
    healthStatus?: Maybe<Status>;
    notificationStatus?: Maybe<NotificationStatus>;
    threshold?: Maybe<Scalars["Float"]>;
    unit?: Maybe<Scalars["String"]>;
};

export type SensorUpdatedResponse = MutationResponse & {
    __typename?: "SensorUpdatedResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    sensor?: Maybe<Sensor>;
};

export type MachineCreationResponse = MutationResponse & {
    __typename?: "MachineCreationResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    machine?: Maybe<Machine>;
};

export type SensorInput = {
    machineID: Scalars["ID"];
    name: Scalars["String"];
};

export type SensorCreationResponse = MutationResponse & {
    __typename?: "SensorCreationResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
    sensor?: Maybe<Sensor>;
};

export enum Unit {
    Mps2 = "MPS2",
    Mps2Rms = "MPS2_RMS",
}

export type UserUpdatedResponse = MutationResponse & {
    __typename?: "UserUpdatedResponse";
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
};

export enum CacheControlScope {
    Public = "PUBLIC",
    Private = "PRIVATE",
}
