import React from "react";
import { useStore } from "../store/store";
import DesktopHeader from "./DesktopHeader";
import { Hidden } from "@material-ui/core";

export default function Dashboard(props: { children?: any }) {
  const { children } = props;
  const [{ isInit }] = useStore();

  return (
    <>
      <Hidden smDown implementation="css">
        <DesktopHeader />
      </Hidden>
      {children && isInit && children}
    </>
  );
}
