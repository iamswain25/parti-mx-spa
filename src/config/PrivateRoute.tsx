import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useCurrentUser } from "../store/useGlobalState";
export default function PrivateRoute(props: RouteProps) {
  const { component, ...rest } = props;
  const Comp = component as React.ElementType;
  const [currentUser] = useCurrentUser();
  if (currentUser === undefined) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 20,
          maxWidth: 900,
        }}
      >
        loading...
      </div>
    );
  }
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
