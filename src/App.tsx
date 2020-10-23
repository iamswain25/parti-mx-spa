import React from "react";
import Routes from "./config/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./config/ThemeCustom";
import useEffectAuth from "./store/useEffectAuth";
export default function App() {
  useEffectAuth();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}
