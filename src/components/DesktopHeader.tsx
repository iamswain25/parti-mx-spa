import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useStore } from "../store/store";
import LogoutButton from "./LogoutButton";
import DrawerGroup from "./DrawerGroup";
import LoginButton from "./LoginButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      maxWidth: 1200,
      paddingLeft: 30,
      paddingRight: 30,
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "transparent",
      color: theme.palette.common.white,
    },
    boxShadow: "none",
  },
  toolbar: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    [theme.breakpoints.up("md")]: {
      padding: 0,
      minHeight: 48,
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 2fr",
    },
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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

export default function DesktopHeader() {
  const [{ user_id }] = useStore();
  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar classes={{ regular: classes.toolbar }}>
        <DrawerGroup />
        <Link to="/home" className={classes.logoFont}>
          와글와글 정책실
        </Link>
        <Typography
          variant="h3"
          noWrap
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {user_id ? <LogoutButton /> : <LoginButton />}
          {user_id && (
            <Link
              to="/search"
              style={{ display: "flex", alignItems: "center", padding: 10 }}
            >
              <SearchIcon />
            </Link>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
