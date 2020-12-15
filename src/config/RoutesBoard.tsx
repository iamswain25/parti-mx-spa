import React from "react";
import RouteBoard from "../components/RouteBoard";
import RoutePostNew from "../components/RoutePostNew";
import { Route, Switch } from "react-router-dom";
import useEffectBoardId from "../store/useEffectBoardId";
import RouteMap from "../components/RouteMap";
import AdminRoute from "./AdminRoute";
import Report from "../components/Report";
export default function RoutesBoard() {
  useEffectBoardId();
  return (
    <Switch>
      <Route exact path="/:group_id/:board_id" component={RouteBoard} />
      <Route exact path="/:group_id/:board_id/new" component={RoutePostNew} />
      <AdminRoute exact path="/:group_id/:board_id/report" component={Report} />
      <Route exact path="/:group_id/:board_id/map" component={RouteMap} />
    </Switch>
  );
}
