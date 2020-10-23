import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { Grid, Box, Button, Hidden } from "@material-ui/core";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import useBoards from "../store/useBoards";
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
      overflow: "auto",
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
  const classes = useStyles();
  const isHome = useRouteMatch("/home");
  const [boards] = useBoards(true);
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
    history.push(`/home/${board?.id}/new`);
  }
  return (
    <Grid
      container
      className={`${classes.gridTab} ${isTop ? "ontop" : ""}`}
      ref={stickyHeader}
    >
      <div className={classes.tab}>
        <Box display="flex" flexWrap="nowrap">
          <NavLink exact to={`/home`} className={classes.tabLink}>
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
        {board && !isHome?.isExact && (
          <>
            <div className={classes.btn}>
              <Button variant="contained" color="primary" onClick={btnHandler}>
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
