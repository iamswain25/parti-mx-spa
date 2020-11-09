import React from "react";
import Home from "../components/Home";
import BoardsSetting from "../components/BoardsSetting";
import GroupEdit from "../components/GroupEdit";
import Members from "../components/Members";
import MemberNew from "../components/MemberNew";
import AdminRoute from "./AdminRoute";
import Report from "../components/Report";
import { Route, Switch } from "react-router-dom";
import useEffectGroupId from "../store/useEffectGroupId";
import RoutesBoard from "./RoutesBoard";
export default function RoutesGroup() {
  useEffectGroupId();
  return (
    <Switch>
      <AdminRoute path="/:group_id/boards" exact component={BoardsSetting} />
      <AdminRoute path="/:group_id/members" exact component={Members} />
      <AdminRoute path="/:group_id/members/new" exact component={MemberNew} />
      <Route exact path="/:group_id" component={Home} />
      <AdminRoute path="/:group_id/report" exact component={Report} />
      <AdminRoute path="/:group_id/edit" exact component={GroupEdit} />
      <Route path="/:group_id/:board_id" component={RoutesBoard} />
    </Switch>
  );
}
