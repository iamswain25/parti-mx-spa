import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../containers/login";
import SuggestionNew from "../components/SuggestionNew";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/Home";
import SuggestionDetail from "../components/SuggestionDetail";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Dashboard>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/suggestion" exact component={SuggestionNew} />
          <Route path="/suggestion/:id" exact component={SuggestionDetail} />
          <Route path="/login" exact component={Login} />
        </Dashboard>
      </Switch>
    </Router>
  );
}
