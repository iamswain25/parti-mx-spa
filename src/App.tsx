import React from "react";
import Routes from "./config/Routes";
import { auth } from "./config/firebase";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./config/ThemeCustom";
import { useGlobalState, keys } from "./store/useGlobalState";
export default function App() {
  React.useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
      } else {
        auth.signInAnonymously();
      }
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}
