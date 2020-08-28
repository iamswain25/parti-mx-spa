import React from "react";
import { HomeGroup, Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { Grid, Box, Button, Hidden } from "@material-ui/core";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useQuery } from "@apollo/client";
import { queryBoardsOnly } from "../graphql/query";
import { useStore } from "../store/store";
import permissionBlocked from "./permissionBlocked";
const useStyles = makeStyles((theme) => {
  return {
    gridTab: {
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
          borderBottomColor: "#007e55",
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
      flex: 1,
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

export default function BoardTabNavigator({ board }: { board?: Board }) {
  const [{ group_id }] = useStore();
  const classes = useStyles();
  const isHome = useRouteMatch("/home");
  const [userStatus] = useGlobalState(keys.PERMISSION);
  const [isTop, setTop] = React.useState(false);
  const stickyHeader = React.useRef(null);
  const { data } = useQuery<HomeGroup>(queryBoardsOnly, {
    variables: { group_id },
    fetchPolicy: "network-only",
  });
  const boards = data?.mx_groups_by_pk?.boards;
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
  if (!boards) {
    return null;
  }
  function btnHandler() {
    history.push("/new/" + board?.id);
  }
  return (
    <Grid
      container
      className={`${classes.gridTab} ${isTop ? "ontop" : ""}`}
      ref={stickyHeader}
    >
      <div className={classes.tab}>
        <Box display="flex" flexWrap="nowrap">
          <NavLink
            exact
            to={`/home?group_id=${group_id}`}
            className={classes.tabLink}
          >
            홈
          </NavLink>
          {boards.map((b, i) => (
            <NavLink
              to={`/home/${b.id}`}
              key={i}
              className={`${classes.tabLink} ${
                board?.id === b.id ? "active" : ""
              }`}
            >
              {b.title}
            </NavLink>
          ))}
        </Box>
        {board &&
          !permissionBlocked(board.permission, userStatus) &&
          !isHome?.isExact && (
            <>
              <div className={classes.btn}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={btnHandler}
                >
                  글쓰기
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
      </div>
    </Grid>
  );
}
