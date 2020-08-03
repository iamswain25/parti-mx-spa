import React from "react";
import { BoardTypes, Group } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { Grid, Box, Button, Hidden } from "@material-ui/core";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import { useGlobalState, keys } from "../store/useGlobalState";
const useStyles = makeStyles((theme) => {
  return {
    gridTab: {
      overflowX: "scroll",
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
      height: 48,
      overflow: "auto",
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.2,
      textAlign: "center",
      alignItems: "center",
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: "space-between",
    },
    tabLink: {
      minWidth: 72,
      padding: theme.spacing(2),
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

export default function BoardTabNavigator({
  group,
  type,
  board_id,
}: {
  group: Group;
  type?: BoardTypes;
  board_id?: number;
}) {
  const { boards = [] } = group;
  const classes = useStyles();
  const isHome = useRouteMatch("/home");
  const [userStatus] = useGlobalState(keys.PERMISSION);
  const [isTop, setTop] = React.useState(false);
  const stickyHeader = React.useRef(null);
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
  function btnHandler() {
    const boardId = board_id ?? boards?.[0].id;
    const boardType = type ?? boards?.[0].type;
    switch (boardType) {
      default:
        return history.push("/new/" + boardId);
    }
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
            to={`/home?group_id=${group.id}`}
            className={classes.tabLink}
          >
            홈
          </NavLink>
          {boards?.map((b, i) => (
            <NavLink
              to={`/home/${b.id}`}
              key={i}
              className={`${classes.tabLink} ${
                board_id && board_id === b.id ? "active" : ""
              }`}
            >
              {b.title}
            </NavLink>
          ))}
        </Box>
        {["user", "organizer"].includes(userStatus as string) &&
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
