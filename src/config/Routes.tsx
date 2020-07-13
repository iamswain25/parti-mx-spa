import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import SuggestionNew from "../components/SuggestionNew";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/Home";
import RouteBoard from "../components/RouteBoard";
import Signup from "../components/Signup";
import RoutePost from "../components/RoutePost";
import useParseGroupId from "../components/useParseGroupId";
import LoginModal from "../components/LoginModal";
import SnackbarCustom from "../components/SnackbarCustom";

export default function Routes() {
  useParseGroupId();
  return (
    <>
      <Switch>
        <Route path="/post/:post_id" exact component={RoutePost} />
        <Route path="/home/:board_id" exact component={RouteBoard} />
        <Dashboard>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <PrivateRoute path="/suggestion" exact component={SuggestionNew} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Dashboard>
      </Switch>
      <LoginModal />
      <SnackbarCustom />
    </>
  );
}
