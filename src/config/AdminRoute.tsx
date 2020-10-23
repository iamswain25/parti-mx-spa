import React from "react";
import { Route, RouteProps } from "react-router-dom";

import useGroupId from "../store/useGroupId";

import Forbidden from "../components/Forbidden";
export default function AdminRoute(props: RouteProps) {
  const { component, ...rest } = props;
  const Comp = component as React.ElementType;
  const [groupId] = useGroupId();
  return (
    <Route
      {...rest}
      render={({ location }) => (groupId ? <Comp /> : <Forbidden notAdmin />)}
    />
  );
}
