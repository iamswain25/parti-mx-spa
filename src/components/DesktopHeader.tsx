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
import { Grid } from "@material-ui/core";

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
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      color: theme.palette.common.white,
    },
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    gridTemplateColumns: "1fr 3fr 1fr",
    [theme.breakpoints.up("md")]: {
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
      <Toolbar classes={{ regular: classes.toolbar }} disableGutters>
        <Grid container item xs={3} md={2} alignItems="center">
          <DrawerGroup />
        </Grid>
        <Grid item xs={8} className={classes.logoFont}>
          <Link to="/home?group_id=101">Parti Mix</Link>
        </Grid>
        <Grid
          container
          item
          xs={9}
          md={2}
          alignItems="center"
          justify="flex-end"
        >
          <Typography variant="h3" noWrap>
            <Grid container alignItems="center">
              {user_id ? <LogoutButton /> : <LoginButton />}
              {user_id && (
                <Link
                  to="/search"
                  style={{ display: "flex", alignItems: "center", padding: 10 }}
                >
                  <SearchIcon />
                </Link>
              )}
            </Grid>
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
