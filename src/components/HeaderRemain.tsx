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
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    maxWidth: 1200,
    margin: "0 auto",
    boxShadow: "none",
  },
  toolbar: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
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
  },
  flexend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

export default function HeaderRemain(props: { children?: any }) {
  const { children } = props;
  const [{ isInit, user_id }] = useStore();
  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar classes={{ regular: classes.toolbar }}>
          <DrawerGroup />
          <Link to="/home" className={classes.logoFont}>
            와글와글 정책실
          </Link>
          <Typography variant="h3" noWrap className={classes.flexend}>
            <Hidden smDown implementation="css">
              {user_id ? <LogoutButton /> : <LoginButton />}
            </Hidden>
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
      {children && isInit && children}
    </>
  );
}
