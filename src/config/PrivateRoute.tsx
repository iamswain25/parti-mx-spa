import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useStore } from "../store/store";
export default function PrivateRoute(props: RouteProps) {
  const { component, ...rest } = props;
  const Comp = component as React.ElementType;
  const [{ user_id }] = useStore();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user_id ? (
          <Comp />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
