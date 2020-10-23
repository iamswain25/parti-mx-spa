import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import useAuth from "../store/useAuth";
import useGroupId from "../store/useGroupId";
export default function PrivateRoute(props: RouteProps) {
  const { component, ...rest } = props;
  const Comp = component as React.ElementType;
  const [user] = useAuth();
  const userId = user?.uid;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userId ? (
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
