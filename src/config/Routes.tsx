import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import RoutePost from "../components/RoutePost";
import LoginModal from "../components/LoginModal";
import SnackbarCustom from "../components/SnackbarCustom";
import SnackbarSuccess from "../components/SnackbarSuccess";
import { CssBaseline, makeStyles } from "@material-ui/core";
import RoutePostEdit from "../components/RoutePostEdit";
import GroupNew from "../components/GroupNew";
import Profile from "../components/Profile";
import Search from "../components/Search";
import PasswordForgot from "../components/PasswordForgot";
import useSignInWithEmailLink from "../components/useSignInWithEmailLink";
import { initialState } from "../store/useGlobalState";
import GroupLogoContainer from "../components/GroupLogoContainer";
import Logout from "../components/Logout";
import useEffectRole from "../store/useEffectRole";
import Footer from "../components/Footer";
import RoutesGroup from "./RoutesGroup";
import useEffectBoards from "../store/useEffectBoards";
import HeaderRemain from "../components/HeaderRemain";

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
  useEffectBoards();
  return (
    <>
      <CssBaseline />
      <HeaderRemain />
      <GroupLogoContainer />
      <div className={classes.root}>
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
      </div>
      <Footer />
      <LoginModal />
      <SnackbarCustom />
      <SnackbarSuccess />
    </>
  );
}
