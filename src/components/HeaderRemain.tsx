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
import { Grid, Hidden } from "@material-ui/core";
import { version } from "../../package.json";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    maxWidth: 1200,
    margin: "0 auto",
    boxShadow: "none",
    paddingLeft: 30,
    paddingRight: 30,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      minHeight: 48,
      height: 48,
    },
  },
  logoFont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
        <Toolbar classes={{ regular: classes.toolbar }} disableGutters>
          <Grid container>
            <Grid container item xs={2} alignItems="center">
              <DrawerGroup />
            </Grid>
            <Grid item xs={8} className={classes.logoFont}>
              <Link to="/home">빠띠 믹스 (v{version})</Link>
            </Grid>
            <Grid item xs={2} className={classes.flexend}>
              <Typography variant="h3" noWrap>
                <Grid container alignItems="center">
                  {user_id ? (
                    <Hidden smDown>
                      <LogoutButton />
                    </Hidden>
                  ) : (
                    <LoginButton />
                  )}
                  {user_id && (
                    <Link
                      to="/search"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                      }}
                    >
                      <SearchIcon />
                    </Link>
                  )}
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children && isInit && children}
    </>
  );
}
