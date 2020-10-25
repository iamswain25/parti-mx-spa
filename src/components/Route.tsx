import React from "react";
import { RouteProps, Route as R } from "react-router-dom";
import useEffectParams from "../store/useEffectParams";

export default function Route(props: RouteProps) {
  useEffectParams();
  return <R {...props} />;
}
