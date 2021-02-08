import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import { useCurrentUser } from "../store/useGlobalState";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import DrawerGroup from "./DrawerGroup";
import MenuProfile from "./MenuProfile";
import useGroup from "../store/useGroup";
import greenlablogo from "../assets/images/greenlablogo.png";
import SearchButton from "./SearchButton";
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    // borderBottom: "1px solid #E0E0E0",
    // color: theme.palette.primary.main,
    color: "rgba(18, 18, 18, 0.74)",
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  toolbar: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      paddingLeft: 30,
      paddingRight: 30,
      minHeight: theme.mixins.toolbar.minHeight,
      height: theme.mixins.toolbar.minHeight,
    },
  },
  logoFont: {
    lineHeight: 1.2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: "-0.56px",
    color: theme.palette.grey[900],
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
      maxWidth: "100%",
      textAlign: "center",
      position: "absolute",
      justifyContent: "center",
      width: `calc(100% - 100px)`,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    // color: theme.palette.primary.main,
  },
  logoImg: {
    width: 275,
  },
  flexend: {
    [theme.breakpoints.down("sm")]: {
      // display: "none",
      maxWidth: "100%",
      flex: 1,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

export default function HeaderRemain() {
  const classes = useStyles();
  const [group] = useGroup();
  const [currentUser] = useCurrentUser();
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar classes={{ regular: classes.toolbar }} disableGutters>
        <Grid container>
          <Hidden mdUp>
            <DrawerGroup />
          </Hidden>
          <Grid item xs={2}></Grid>
          <Grid item xs={8} className={classes.logoFont}>
            {/* <Link to={`/${group?.id}`}>{group?.title}</Link> */}
            <Link to={`/${group?.id}`}>
              <img className={classes.logoImg} src={greenlablogo} alt="logo" />
            </Link>
          </Grid>
          <Grid item xs={2} className={classes.flexend}>
            <Hidden xsDown implementation="css">
              {currentUser?.email && <MenuProfile />}
            </Hidden>
            <SearchButton />
            <Hidden smDown implementation="css">
              {currentUser?.email ? <LogoutButton /> : <LoginButton />}
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
