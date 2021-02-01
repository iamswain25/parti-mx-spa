import React from "react";
import Routes from "./config/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { LinearProgress, ThemeProvider } from "@material-ui/core";
import { theme } from "./config/ThemeCustom";
import useEffectAuth from "./store/useEffectAuth";
import { useCurrentUser } from "./store/useGlobalState";
export default function App() {
  useEffectAuth();
  const [user] = useCurrentUser();
  if (user === undefined) {
    return <LinearProgress />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}
