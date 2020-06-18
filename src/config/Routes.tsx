import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Dashboard from "../containers/dashboard";
import Login from "../containers/login";
import { useStore } from "../store/store";
import { auth, getUserId2 } from "../services/firebase";
import firebase from "firebase";

export default function Routes() {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [{ user_id }, dispatch] = useStore();
  React.useEffect(() => {
    return auth.onAuthStateChanged((_user) => {
      setUser(_user);
      if (_user) {
        return getUserId2(_user).then((id) => {
          if (id !== null) {
            dispatch({ type: "SET_USER", user_id: id });
          }
        });
      } else {
        dispatch({ type: "SET_USER", user_id: null });
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route
          path="/login"
          exact
          component={() => {
            if (user && user_id !== null) {
              return <Redirect to="/" />;
            } else {
              return <Login />;
            }
          }}
        />
      </Switch>
    </Router>
  );
}
