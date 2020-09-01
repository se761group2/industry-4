import urljoin from "url-join";
import { ApolloClient, NormalizedCacheObject, ApolloLink } from "@apollo/client";
import { BatchHttpLink } from "apollo-link-batch-http";
import { setContext } from "@apollo/client/link/context";
import { resolvers } from "../../common/graphql/localResolvers";
import { typeDefs } from "../../common/graphql/localSchema";
import { firebaseApp } from "../firebase";
import { InMemoryCache } from "@apollo/client";
import introspectionResult from "../../types/schema.json";

function generateInMemoryCache() {
    const possibleTypes = {};

    introspectionResult.__schema.types.forEach((supertype) => {
        if (supertype.possibleTypes) {
            possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
        }
    });

    return new InMemoryCache({
        possibleTypes: possibleTypes,
    });
}

const cache = generateInMemoryCache();

const authLink = setContext(async (req, { headers }) => {
    const currentUser = firebaseApp.auth().currentUser;
    if (!currentUser) {
        return;
    }

    const token = await currentUser.getIdToken();

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});
const apolloHttpLink = new BatchHttpLink({
    uri: urljoin(process.env.REACT_APP_ENDPOINT_URL || "", "graph"),
});

export const refreshApolloAuthentication = () => {
    apolloClient.link = ApolloLink.from([authLink, (apolloHttpLink as unknown) as ApolloLink]);
};

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
    cache,
    link: ApolloLink.from([authLink, (apolloHttpLink as unknown) as ApolloLink]),
    typeDefs,
    resolvers,
    connectToDevTools: true,
});
