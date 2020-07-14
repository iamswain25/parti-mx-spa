import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useStore } from "../store/store";
import LogoutButton from "./LogoutButton";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import DrawerGroup from "./DrawerGroup";
import LoginButton from "./LoginButton";
const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "block",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      color: theme.palette.primary.main,
    },
    "&.hide": {
      visibility: "hidden",
    },
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "transparent",
      color: theme.palette.common.white,
    },
    // zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      minHeight: theme.mixins.toolbar.minHeight,
      paddingLeft: 49,
      paddingRight: 49,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 19,
      paddingRight: 19,
    },
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 1200,
  },
  logoFont: {
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function Dashboard(props: { children?: any }) {
  const { children } = props;
  const [{ user_id, isInit }] = useStore();
  const classes = useStyles();
  const [hideOnScroll, setHideOnScroll] = React.useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > 180 - 56;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll],
    undefined,
    true
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={`${classes.appBar} ${hideOnScroll ? "hide" : ""}`}
      >
        <Toolbar classes={{ regular: classes.toolbar }}>
          <div className={classes.header}>
            <DrawerGroup />
            <Link to="/home" className={classes.logoFont}>
              Parti Mix
            </Link>
            {/* {isDesktop && ( */}
            <Typography variant="h3" noWrap>
              {user_id ? <LogoutButton /> : <LoginButton />}
            </Typography>
            {/* )} */}
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children && isInit && children}</main>
    </div>
  );
}
