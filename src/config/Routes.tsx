import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import { useStore } from "../store/store";
import SnackbarSuccess from "../components/SnackbarSuccess";
import { CssBaseline } from "@material-ui/core";
import RouteMap from "../components/RouteMap";
import RoutePhoto from "../components/RoutePhoto";
import RoutePostEdit from "../components/RoutePostEdit";

export default function Routes() {
  useParseGroupId();
  const [{ isInit }] = useStore();
  return (
    <>
      <CssBaseline />
      {isInit && (
        <Switch>
          <Route path="/photo/:board_id" exact component={RoutePhoto} />
          <Route path="/map/:board_id" exact component={RouteMap} />
          <Route path="/home/:board_id" exact component={RouteBoard} />
          <Route path="/home" exact component={Home} />
          <Dashboard>
            <Route path="/post/:post_id" exact component={RoutePost} />
            <Route path="/edit/:post_id" exact component={RoutePostEdit} />
            <PrivateRoute
              path="/suggestion/:board_id"
              exact
              component={SuggestionNew}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </Dashboard>
        </Switch>
      )}
      <LoginModal />
      <SnackbarCustom />
      <SnackbarSuccess />
    </>
  );
}
