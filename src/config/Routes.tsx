import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/Home";
import RouteBoard from "../components/RouteBoard";
// import Signup from "../components/Signup";
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
import Profile from "../components/Profile";
import Search from "../components/Search";
import HeaderRemain from "../components/HeaderRemain";
import PasswordForgot from "../components/PasswordForgot";
import useSignInWithEmailLink from "../components/useSignInWithEmailLink";

export default function Routes() {
  useParseGroupId();
  useSignInWithEmailLink();
  const [{ isInit }] = useStore();
  return (
    <>
      <CssBaseline />
      {isInit && (
        <HeaderRemain>
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/forgot" exact component={PasswordForgot} />
            <Route path="/photo/:board_id" exact component={RoutePhoto} />
            <Route path="/map/:board_id" exact component={RouteMap} />
            <Route path="/home/:board_id" exact component={RouteBoard} />
            {/* <Route path="/login" exact component={Login} /> */}
            {/* <Route path="/signup" exact component={Signup} /> */}
            <PrivateRoute path="/boards" exact component={BoardsSetting} />
            <PrivateRoute path="/members" exact component={MemberSetting} />
            <PrivateRoute path="/members/new" exact component={MemberNew} />
            <PrivateRoute path="/group/new" exact component={GroupNew} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/group/edit" exact component={GroupEdit} />
            <Route path="/search" exact component={Search} />
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
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </HeaderRemain>
      )}
      <LoginModal />
      <SnackbarCustom />
      <SnackbarSuccess />
    </>
  );
}
