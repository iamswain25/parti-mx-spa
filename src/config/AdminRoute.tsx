import React from "react";
import { Route, RouteProps } from "react-router-dom";
import Forbidden from "../components/Forbidden";
import { useGroupId } from "../store/useGlobalState";
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
