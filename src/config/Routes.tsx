import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "../containers/dashboard";
import Modal from "../components/Modal";
import MainLayout from "../Hoc/MainLayout";
import SnackBar from "../components/SnackBar";
import Login from "../containers/login";

export default function Routes() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Modal />
        <SnackBar />
      </MainLayout>
    </Router>
  );
}
