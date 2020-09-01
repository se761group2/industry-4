export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type Query = {
    __typename?: "Query";
    user?: Maybe<User>;
};

export type QueryUserArgs = {
    id: Scalars["ID"];
};

export type User = {
    __typename?: "User";
    id: Scalars["ID"];
    email: Scalars["String"];
};

export type Mutation = {
    __typename?: "Mutation";
    updateUser?: Maybe<MutationResponse>;
};

export type MutationUpdateUserArgs = {
    id: Scalars["ID"];
};

export type MutationResponse = {
    code: Scalars["String"];
    success: Scalars["Boolean"];
    message: Scalars["String"];
};

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
