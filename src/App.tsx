import React from "react";

import Routes from "./config/Routes";
import { ApolloProvider } from "@apollo/client";
import { StoreProvider } from "./store/store";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { IdTokenResult, auth } from "./config/firebase";
import { Theme, ThemeProvider, createMuiTheme } from "@material-ui/core";
const HASURA_DOMAIN = `api.parti.mx/v1/graphql`;

const wsLink = new WebSocketLink({
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
const DRAWER_MIN_HEIGHT = 56;
const theme: Theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          display: "block",
        },
        button: {
          color: "inherit",
        },
      },
    },
  },
  palette: {
    primary: { main: "#00a270", dark: "#009062", light: "#e3f5ef" },
  },
  mixins: {
    toolbar: {
      minHeight: DRAWER_MIN_HEIGHT,
      "@media (min-width: 600px)": {
        minHeight: DRAWER_MIN_HEIGHT,
      },
      "@media (min-width:0px) and (orientation: landscape)": {
        minHeight: DRAWER_MIN_HEIGHT,
      },
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        body1: "div",
        body2: "div",
        // h1: "div",
        // h2: "div",
        // h3: "div",
        // h4: "div",
        // h5: "div",
        h6: "div",
      },
    },
  },
  typography: {
    fontFamily: "NotoSansCJKkr",
    h2: {
      fontSize: 20,
      letterSpacing: -0.75,
      textAlign: "center",
    },
    h3: {
      //제목
      fontSize: 18,
      letterSpacing: -0.5,
    },
    h4: {
      fontSize: 16,
      letterSpacing: -0.6,
      fontWeight: "inherit",
    },
    h5: {
      fontSize: 14,
      letterSpacing: -0.3,
      fontWeight: "inherit",
    },
    h6: {
      fontSize: 12,
      fontWeight: "inherit",
    },
    body1: {
      fontSize: 14,
      letterSpacing: -0.3,
      fontWeight: "inherit",
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
    },
    body2: {
      fontSize: 11,
      fontWeight: "inherit",
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
    },
    subtitle1: {
      fontSize: 14,
      letterSpacing: -0.38,
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      fontWeight: "inherit",
    },
    subtitle2: {
      fontSize: 11,
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      fontWeight: "inherit",
    },
    button: {
      fontSize: 14,
      letterSpacing: 0.2,
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      fontWeight: "inherit",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <StoreProvider>
          <Routes />
        </StoreProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
