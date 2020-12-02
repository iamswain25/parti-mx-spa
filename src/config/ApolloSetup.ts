import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { IdTokenResult, auth } from "./firebase";
const HASURA_DOMAIN = `api.parti.mx/v1/graphql`;

export const wsLink = new WebSocketLink({
  uri: `wss://${HASURA_DOMAIN}`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: getFirebaseAuthHeader,
  },
});

const httpLink = new HttpLink({
  uri: `https://${HASURA_DOMAIN}`,
  credentials: "same-origin",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
splitLink.setOnError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }: any) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
async function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}
let refreshCounts = 0;
async function extractValidToken(refresh = false): Promise<string | null> {
  if (auth.currentUser === null) {
    return null;
  }
  const res:
    | IdTokenResult
    | undefined = await auth.currentUser.getIdTokenResult(refresh);
  if (res?.claims?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"]) {
    return res.token;
  } else {
    if (refresh) {
      refreshCounts++;
      await delay(500);
      console.log("token try: " + refreshCounts);
    }
    return extractValidToken(true);
  }
}
async function getFirebaseAuthHeader(_previousHeader?: Object) {
  let token = await extractValidToken();
  if (token) {
    const Authorization = "Bearer " + token;
    return { headers: { Authorization, ..._previousHeader } };
  }
  return { headers: _previousHeader };
}
const authLink = setContext((_, { headers }) => getFirebaseAuthHeader(headers));

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      mx_groups: {
        merge(existing, incoming) {
          return { ...existing, ...incoming };
        },
      },
      mx_groups_by_pk: {
        merge(existing, incoming) {
          return { ...existing, ...incoming };
        },
      },
    },
  }),
  link: authLink.concat(splitLink),
});
