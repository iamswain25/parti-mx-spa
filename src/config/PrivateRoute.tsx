import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useCurrentUser } from "../store/useGlobalState";
export default function PrivateRoute(props: RouteProps) {
  const { component, ...rest } = props;
  const Comp = component as React.ElementType;
  const [currentUser] = useCurrentUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser?.email ? (
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
