import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useStore } from "../store/store";
export default function PrivateRoute({ component, path, exact }: RouteProps) {
  const Comp = component as React.ReactType;
  const [{ user_id }] = useStore();
  return (
    <Route
      path={path}
      exact={exact}
      component={() =>
        typeof user_id === "number" ? (
          <Comp />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: path },
            }}
          />
        )
      }
    />
  );
}
