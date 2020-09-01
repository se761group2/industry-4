import { authMutationResolvers, localUser } from "./resolvers/auth";

export const resolvers = {
    Query: {
        localUser: () => {
            return localUser();
        },
    },
    Mutation: {
        ...authMutationResolvers,
    },
};
