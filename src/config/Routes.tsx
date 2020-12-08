import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import RoutePost from "../components/RoutePost";
import LoginModal from "../components/LoginModal";
import SnackbarCustom from "../components/SnackbarCustom";
import SnackbarSuccess from "../components/SnackbarSuccess";
import { CssBaseline } from "@material-ui/core";
import RoutePostEdit from "../components/RoutePostEdit";
import GroupNew from "../components/GroupNew";
import Profile from "../components/Profile";
import Search from "../components/Search";
import PasswordForgot from "../components/PasswordForgot";
import useSignInWithEmailLink from "../components/useSignInWithEmailLink";
import { initialState } from "../store/useGlobalState";
import Logout from "../components/Logout";
import useEffectRole from "../store/useEffectRole";
import RoutesGroup from "./RoutesGroup";
import useEffectBoards from "../store/useEffectBoards";
import HeaderRemain from "../components/HeaderRemain";
import GroupLogoContainer from "../components/GroupLogoContainer";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function Routes() {
  useSignInWithEmailLink();
  useEffectRole();
  useEffectBoards();
  return (
    <>
      <CssBaseline />
      <HeaderRemain />
      <Route path={["/:group_id"]} exact component={GroupLogoContainer} />
      <Layout>
        <Switch>
          <Route path="/forgot" exact component={PasswordForgot} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/post/:post_id" exact component={RoutePost} />
          <Route path="/edit/:post_id" exact component={RoutePostEdit} />
          <Route
            exact
            path="/p/:id"
            render={(props) => (
              <Redirect to={`/post/${props.match.params.id}`} />
            )}
          />
          <Route path="/group/new" exact component={GroupNew} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/search" exact component={Search} />
          <Route path="/:group_id" component={RoutesGroup} />
          <Route path="*">
            <Redirect to={`/${initialState.groupId}`} />
          </Route>
        </Switch>
      </Layout>
      <Footer />
      <LoginModal />
      <SnackbarCustom />
      <SnackbarSuccess />
    </>
  );
}
