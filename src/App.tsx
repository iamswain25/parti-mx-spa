import React from "react";
import Routes from "./config/Routes";
import { ApolloProvider } from "@apollo/client";
import { StoreProvider } from "./store/store";
import { client } from "./components/ApolloSetup";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./components/ThemeCustom";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
