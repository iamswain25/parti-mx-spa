import React from "react";
import ReactDOM from "react-dom";

import "./index.sass";
import * as serviceWorker from "./serviceWorker";
import Routes from "./config/Routes";

import { ApolloProvider } from "@apollo/client";
import { StoreProvider } from "./store/store";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { IdTokenResult, auth } from "./services/firebase";
const HASURA_DOMAIN = `hasura-load-balancer-1241189389.ap-northeast-2.elb.amazonaws.com/v1/graphql`;

const wsLink = new WebSocketLink({
  uri: `ws://${HASURA_DOMAIN}`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: getFirebaseAuthHeader,
  },
});

const httpLink = new HttpLink({
  uri: `http://${HASURA_DOMAIN}`,
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
async function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}
let refreshCounts = 0;
async function extractValidToken(refresh = false): Promise<string> {
  const res:
    | IdTokenResult
    | undefined = await auth?.currentUser?.getIdTokenResult(refresh);
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
  const header = {};
  if (_previousHeader) {
    Object.assign(header, _previousHeader);
  }
  let token = await extractValidToken();

  if (token) {
    const Authorization = "Bearer " + token;
    return { headers: { ...header, Authorization } };
  }
  return { headers: header };
}
const authLink = setContext((_, { headers }) => getFirebaseAuthHeader(headers));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <Routes />
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
