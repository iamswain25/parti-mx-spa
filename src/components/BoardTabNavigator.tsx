import React from "react";
import { HomeGroup } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, Link } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { Grid, Box, Button, Hidden } from "@material-ui/core";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import { useQuery } from "@apollo/client";
import { queryBoardsOnly, whoami } from "../graphql/query";
import { useStore } from "../store/store";
import usePermEffect from "./usePermEffect";
import GroupLogoContainer from "./GroupLogoContainer";
import GreyDivider from "./GreyDivider";
import SearchIcon from "@material-ui/icons/Search";
import MenuProfile from "./MenuProfile";
import LoginButton from "./LoginButton";
const useStyles = makeStyles((theme) => {
  return {
    gridTab: {
      overflowX: "auto",
      position: "sticky",
      top: -1,
      boxShadow: `0 4px 2px -2px ${grey[300]}`,
      backgroundColor: theme.palette.background.paper,
      //  theme.shadows[1],
      zIndex: theme.zIndex.appBar,
      "& a": {
        color: "rgba(0, 0, 0, 0.6)",
        "&.active": {
          color: "black",
          borderBottomWidth: 2,
          borderBottomColor: theme.palette.primary.main,
          borderBottomStyle: "solid",
        },
      },
      "&.ontop": {
        backgroundColor: theme.palette.primary.main,
        "& button": {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.primary.main,
        },
        "& a": {
          color: "rgba(255, 255, 255, 0.6)",
          "&.active": {
            color: theme.palette.common.white,
            borderBottomColor: theme.palette.common.white,
          },
        },
      },
    },
    tab: {
      [theme.breakpoints.up("md")]: {
        maxWidth: 1200,
        width: 1200,
        padding: "0 30px",
        margin: "0 auto",
      },
      height: 48,
      overflow: "unset",
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.2,
      textAlign: "center",
      alignItems: "stretch",
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: "space-between",
    },
    tabLink: {
      minWidth: 72,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    fab: {
      position: "fixed",
      zIndex: theme.zIndex.speedDial,
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    btn: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      "& button": {
        width: 98,
        padding: 0,
        height: 38,
      },
    },
  };
});

export default function BoardTabNavigator() {
  const [{ group_id, user_id, board_id }] = useStore();
  const classes = useStyles();
  const [isTop, setTop] = React.useState(false);
  const stickyHeader = React.useRef(null);
  const { data } = useQuery<HomeGroup>(queryBoardsOnly, {
    variables: { group_id, user_id, isAnonymous: !user_id },
    fetchPolicy: "network-only",
  });
  const ami = useQuery(whoami, { variables: { id: user_id } });
  const group = data?.mx_groups_by_pk;
  const boards = data?.mx_groups_by_pk?.boards;
  const user = ami?.data?.mx_users_by_pk;
  const userStatus = data?.mx_groups_by_pk?.users?.[0]?.status;
  usePermEffect(userStatus);
  const history = useHistory();
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y < 1;
      if (isShow !== isTop) setTop(isShow);
    },
    [isTop],
    stickyHeader,
    false
  );
  if (!boards || !group) {
    return null;
  }
  function btnHandler() {
    history.push("/new/" + board_id);
  }
  return (
    <>
      <GroupLogoContainer group={group} />
      <Hidden mdUp implementation="css">
        <GreyDivider />
      </Hidden>
      <Grid
        container
        className={`${classes.gridTab} ${isTop ? "ontop" : ""}`}
        ref={stickyHeader}
      >
        <div className={classes.tab}>
          <Box display="flex" flexWrap="nowrap">
            <NavLink to="/home" className={classes.tabLink} exact>
              WTA PLATFORM
            </NavLink>
            {boards.map((b, i) => (
              <NavLink
                to={
                  b.type === "suggestion" ? `/photo/${b.id}` : `/home/${b.id}`
                }
                key={i}
                className={`${classes.tabLink} ${
                  board_id === b.id ? "active" : ""
                }`}
              >
                {b.title}
              </NavLink>
            ))}
          </Box>
          <Grid container alignItems="center" justify="flex-end">
            {user ? <MenuProfile user={user} /> : <LoginButton />}
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
            {["user", "organizer"].includes(userStatus as string) && board_id && (
              <>
                <div className={classes.btn}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={btnHandler}
                  >
                    Write
                  </Button>
                </div>
                <Hidden mdUp implementation="css">
                  <Fab
                    color="primary"
                    aria-label="write"
                    className={classes.fab}
                    onClick={btnHandler}
                  >
                    <CreateIcon />
                  </Fab>
                </Hidden>
              </>
            )}
          </Grid>
        </div>
      </Grid>
    </>
  );
}
