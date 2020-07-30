import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
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
import RoutePostNew from "../components/RoutePostNew";
import BoardsSetting from "../components/BoardsSetting";
import GroupNew from "../components/GroupNew";
import GroupEdit from "../components/GroupEdit";
import MemberSetting from "../components/MemberSetting";
import MemberNew from "../components/MemberNew";

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
            <PrivateRoute
              path="/edit/:post_id"
              exact
              component={RoutePostEdit}
            />
            <PrivateRoute
              path="/new/:board_id"
              exact
              component={RoutePostNew}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute path="/boards" exact component={BoardsSetting} />
            <PrivateRoute path="/members" exact component={MemberSetting} />
            <PrivateRoute path="/members/new" exact component={MemberNew} />
            <PrivateRoute path="/group/new" exact component={GroupNew} />
            <PrivateRoute path="/group/edit" exact component={GroupEdit} />
          </Dashboard>
        </Switch>
      )}
      <LoginModal />
      <SnackbarCustom />
      <SnackbarSuccess />
    </>
  );
}
