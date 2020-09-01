import { firebaseApp } from "../../../services/firebase";
import { ApolloClient, NormalizedCacheObject, ApolloError, makeVar, ReactiveVar } from "@apollo/client";
import { GET_USER_BY_ID } from "../queries/users";
import { GET_LOCAL_USER } from "../queries/local";

export const localUser: ReactiveVar<any> = makeVar(null);

async function attemptLogin(_, __, { cache, client }) {
    const apolloClient: ApolloClient<NormalizedCacheObject> = client;
    const currentUser = firebaseApp.auth().currentUser;

    if (!currentUser) {
        throw new ApolloError({
            errorMessage: "Error logging in. Please try again...",
        });
    }

    // Existing user: let's retrieve data from backend.
    const data = await apolloClient.query({
        query: GET_USER_BY_ID,
        variables: {
            id: currentUser.uid,
        },
    });

    apolloClient.cache.writeQuery({
        query: GET_LOCAL_USER,
        data: { localUser: data.data.user },
        broadcast: true,
    });

    localUser(data.data.user);

    const resp = {
        code: "auth/logged_in",
        success: true,
        message: "Successfully logged in.",
        __typename: "AttemptLoginResponse",
        user: data.data.user,
    };

    return resp;
}

async function doFirebaseLogout(_, __, { cache, client }) {
    await firebaseApp.auth().signOut();

    localStorage.setItem("authState", "null");
    client.resetStore();

    return {
        code: "auth/logged_out",
        success: true,
        message: "Logged out.",
        authState: null,
        __typename: "LoginResponse",
    };
}

export const authMutationResolvers = {
    attemptLogin,
    doFirebaseLogout,
};
