import React from "react";
import Routes from "./config/Routes";
import { ApolloProvider } from "@apollo/client";
import { StoreProvider } from "./store/store";
import { client } from "./config/ApolloSetup";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, LinearProgress } from "@material-ui/core";
import { theme } from "./config/ThemeCustom";
import { useGlobalState, keys } from "./store/useGlobalState";
export default function App() {
  const [loading] = useGlobalState(keys.LOADING);
  return (
    <ThemeProvider theme={theme}>
      {loading && <LinearProgress />}
      <ApolloProvider client={client}>
        <StoreProvider>
          <Router>
            <Routes />
          </Router>
        </StoreProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
