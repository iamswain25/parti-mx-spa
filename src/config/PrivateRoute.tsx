import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useStore } from "../store/store";
export default function PrivateRoute({ component, path, exact }: RouteProps) {
  const Comp = component as React.ReactType;
  const [{ user_id, isInit }] = useStore();
  const pathString = path as string;
  if (!isInit) {
    return <div>"loading..."</div>;
  }
  return (
    <Route
      path={path}
      exact={exact}
      component={() =>
        typeof user_id === "number" ? (
          <Comp />
        ) : (
          <Redirect to={`/login?to=${pathString!.substr(1)}`} />
        )
      }
    />
  );
}
