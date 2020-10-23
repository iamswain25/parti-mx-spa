import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/Home";
import RouteBoard from "../components/RouteBoard";
import Signup from "../components/Signup";
import RoutePost from "../components/RoutePost";
import LoginModal from "../components/LoginModal";
import SnackbarCustom from "../components/SnackbarCustom";
import SnackbarSuccess from "../components/SnackbarSuccess";
import { CssBaseline } from "@material-ui/core";
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
import AdminRoute from "./AdminRoute";
import Report from "../components/Report";
import useGroupId from "../store/useGroupId";

export default function Routes() {
  useSignInWithEmailLink();
  useGroupId();
  return (
    <>
      <CssBaseline />
      <HeaderRemain>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/forgot" exact component={PasswordForgot} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute path="/boards" exact component={BoardsSetting} />
          <PrivateRoute path="/members" exact component={MemberSetting} />
          <PrivateRoute path="/members/new" exact component={MemberNew} />
          <PrivateRoute path="/group/new" exact component={GroupNew} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/group/edit" exact component={GroupEdit} />
          <AdminRoute path="/report" exact component={Report} />
          <Route path="/search" exact component={Search} />
          <Route
            exact
            path="/p/:id"
            render={(props) => (
              <Redirect to={`/post/${props.match.params.id}`} />
            )}
          />
          <Route path="/post/:post_id" exact component={RoutePost} />
          <PrivateRoute path="/edit/:post_id" exact component={RoutePostEdit} />
          <PrivateRoute path="/new/:board_id" exact component={RoutePostNew} />
          <Route exact path="/:group_id" component={Home} />
          <Route exact path="/:group_id/:board_id" component={RouteBoard} />
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </HeaderRemain>
      <LoginModal />
      <SnackbarCustom />
      <SnackbarSuccess />
    </>
  );
}
