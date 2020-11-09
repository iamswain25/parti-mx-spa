import React from "react";
import RouteBoard from "../components/RouteBoard";
import RoutePostNew from "../components/RoutePostNew";
import { Route, Switch } from "react-router-dom";
import useEffectBoardId from "../store/useEffectBoardId";
export default function RoutesBoard() {
  useEffectBoardId();
  return (
    <Switch>
      <Route exact path="/:group_id/:board_id" component={RouteBoard} />
      <Route exact path="/:group_id/:board_id/new" component={RoutePostNew} />
    </Switch>
  );
}
