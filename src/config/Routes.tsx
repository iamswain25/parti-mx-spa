import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import SuggestionList from "../components/SuggestionList";
import Login from "../containers/login";
import SuggestionNew from "../components/SuggestionNew";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/Home";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Dashboard>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/suggestion" exact component={SuggestionNew} />
          <Route path="/suggestion/:id" exact component={SuggestionList} />
          <Route path="/login" exact component={Login} />
        </Dashboard>
      </Switch>
    </Router>
  );
}
