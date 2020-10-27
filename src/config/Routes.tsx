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
import { CssBaseline, makeStyles } from "@material-ui/core";
import RoutePostEdit from "../components/RoutePostEdit";
import RoutePostNew from "../components/RoutePostNew";
import BoardsSetting from "../components/BoardsSetting";
import GroupNew from "../components/GroupNew";
import GroupEdit from "../components/GroupEdit";
import Members from "../components/Members";
import MemberNew from "../components/MemberNew";
import Profile from "../components/Profile";
import Search from "../components/Search";
import PasswordForgot from "../components/PasswordForgot";
import useSignInWithEmailLink from "../components/useSignInWithEmailLink";
import AdminRoute from "./AdminRoute";
import Report from "../components/Report";
import { initialState } from "../store/useGlobalState";
import GroupLogoContainer from "../components/GroupLogoContainer";
import BoardTabNavigator from "../components/BoardTabNavigator";
import Logout from "../components/Logout";
import useEffectRole from "../store/useEffectRole";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(3),
      paddingLeft: 30,
      paddingRight: 30,
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 1200,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginTop: theme.spacing(1),
    },
  },
}));
export default function Routes() {
  const classes = useStyles();
  useSignInWithEmailLink();
  useEffectRole();
  return (
    <>
      <CssBaseline />
      <GroupLogoContainer />
      <BoardTabNavigator />
      <div className={classes.root}>
        <Switch>
          <Route path="/forgot" exact component={PasswordForgot} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute
            path="/:group_id/boards"
            exact
            component={BoardsSetting}
          />
          <PrivateRoute path="/:group_id/members" exact component={Members} />
          <PrivateRoute
            path="/:group_id/members/new"
            exact
            component={MemberNew}
          />
          <PrivateRoute path="/group/new" exact component={GroupNew} />
          <Route path="/search" exact component={Search} />
          <Route
            exact
            path="/p/:id"
            render={(props) => (
              <Redirect to={`/post/${props.match.params.id}`} />
            )}
          />
          <Route path="/post/:post_id" exact component={RoutePost} />
          <Route path="/edit/:post_id" exact component={RoutePostEdit} />
          <Route exact path="/:group_id" component={Home} />
          <AdminRoute path="/:group_id/report" exact component={Report} />
          <AdminRoute path="/:group_id/edit" exact component={GroupEdit} />
          <Route exact path="/:group_id/:board_id" component={RouteBoard} />
          <Route
            exact
            path="/:group_id/:board_id/new"
            component={RoutePostNew}
          />
          <Route path="*">
            <Redirect to={`/${initialState.groupId}`} />
          </Route>
        </Switch>
      </div>
      <LoginModal />
      <SnackbarCustom />
      <SnackbarSuccess />
    </>
  );
}
