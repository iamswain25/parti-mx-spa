import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, NavLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import { useBoardId, useBoards, useCurrentUser } from "../store/useGlobalState";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import DrawerGroup from "./DrawerGroup";
import MenuProfile from "./MenuProfile";
import useGroup from "../store/useGroup";
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid #E0E0E0",
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
      minHeight: 100,
      height: 100,
    },
  },
  logoFont: {
    lineHeight: 1.2,
    display: "flex",
    alignItems: "center",
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
  flexcenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "& .boards": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      fontSize: 20,
      fontWeight: 500,
      textAlign: "center",
      color: theme.palette.grey[800],
      "&.active": {
        color: "#544F85",
        // color: theme.palette.primary.main,
      },
    },
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
  const [board_id] = useBoardId();
  const [boards] = useBoards();
  const [currentUser] = useCurrentUser();
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar classes={{ regular: classes.toolbar }} disableGutters>
        <Grid container>
          <Hidden mdUp implementation="css">
            <DrawerGroup />
          </Hidden>
          <Grid item xs={3} className={classes.logoFont}>
            <Link to={`/${group?.id}`}>{group?.title}서울특별시 사회적경제지원센터</Link>
          </Grid>
          <Grid item xs={7} className={classes.flexcenter}>
            {boards?.map((b, i) => (
              <NavLink
                exact
                to={`/${group?.id}/${b.id}`}
                key={i}
                className="boards"
                isActive={(match) => !!match || b.id === board_id}
                activeClassName="active"
              >
                {b.title}
              </NavLink>
            ))}
          </Grid>
          <Grid item xs={2} className={classes.flexend}>
            {currentUser?.email && <MenuProfile />}
            <Hidden smDown>
              {currentUser?.email ? <LogoutButton /> : <LoginButton />}
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
