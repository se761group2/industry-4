import gql from "graphql-tag";
// Define types in local state here

export const typeDefs = gql`
    type AuthState {
        accessToken: String!
    }

    extend type Query {
        authState: AuthState
        localUser: User
    }

    type LoginResponse implements MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }

    type AttemptLoginResponse implements MutationResponse {
        code: String!
        success: Boolean!
        message: String!
        user: User
    }

    extend type Mutation {
        attemptLogin: AttemptLoginResponse
        doFirebaseLogout: LoginResponse
    }
`;
