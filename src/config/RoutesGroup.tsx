import React from "react";
import Home from "../components/Home";
import BoardsSetting from "../components/BoardsSetting";
import GroupEdit from "../components/GroupEdit";
import Members from "../components/Members";
import MemberNew from "../components/MemberNew";
import AdminRoute from "./AdminRoute";
import Report from "../components/Report";
import { Route, Switch } from "react-router-dom";
import SearchInstant from "../components/SearchInstant";
import useEffectGroupId from "../store/useEffectGroupId";
import RoutesBoard from "./RoutesBoard";
export default function RoutesGroup() {
  useEffectGroupId();
  return (
    <Switch>
      <Route exact path="/:group_id" component={Home} />
      <Route exact path="/:group_id/search" component={SearchInstant} />
      <AdminRoute exact path="/:group_id/boards" component={BoardsSetting} />
      <AdminRoute exact path="/:group_id/members" component={Members} />
      <AdminRoute exact path="/:group_id/members/new" component={MemberNew} />
      <AdminRoute exact path="/:group_id/report" component={Report} />
      <AdminRoute exact path="/:group_id/edit" component={GroupEdit} />
      <Route path="/:group_id/:board_id" component={RoutesBoard} />
    </Switch>
  );
}
