import React from "react";
import { Route, RouteProps } from "react-router-dom";
import Forbidden from "../components/Forbidden";
import { useRole } from "../store/useGlobalState";
export default function AdminRoute(props: RouteProps) {
  const [role] = useRole();
  if (role === undefined) {
    return <div>loading...</div>;
  } else if (role === "organizer") {
    return <Route {...props} />;
  } else {
    return <Forbidden notAdmin />;
  }
}
