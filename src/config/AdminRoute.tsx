import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStore } from "../store/store";
import { queryGroupEdit } from "../graphql/query";
import Forbidden from "../components/Forbidden";
export default function AdminRoute(props: RouteProps) {
  const { component, ...rest } = props;
  const Comp = component as React.ElementType;
  const [{ group_id }] = useStore();
  const { loading, data } = useQuery(queryGroupEdit, {
    variables: { group_id },
  });
  if (loading) {
    return <div>checking admin status...</div>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        data?.mx_groups_by_pk?.status === "organizer" ? (
          <Comp />
        ) : data?.mx_groups_by_pk === null ? (
          <Forbidden noGroup />
        ) : (
          <Forbidden notAdmin />
        )
      }
    />
  );
}
