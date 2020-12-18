import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { Grid, Box, Button, Hidden } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import {
  useBoardId,
  useBoards,
  useGroupId,
  useRole,
} from "../store/useGlobalState";
const useStyles = makeStyles(theme => {
  return {
    gridTab: {
      position: "sticky",
      top: theme.mixins.toolbar.minHeight,
      boxShadow: `0 4px 2px -2px ${grey[300]}`,
      backgroundColor: theme.palette.background.paper,
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
  const [board_id] = useBoardId();
  const [group_id] = useGroupId();
  const { pathname } = useLocation();
  const classes = useStyles();
  const [boards] = useBoards();
  const [role] = useRole();
  const history = useHistory();
  function btnHandler() {
    history.push(`/${group_id}/${board_id}/new`);
  }
  function permissionWrite() {
    if (!board_id) return false;
    const board = boards?.find(b => b.id === board_id);
    if (board && role) {
      return board.permission?.create?.includes(role);
    }
    return false;
  }
  if (!boards) return null;
  return (
    <Grid container className={classes.gridTab}>
      <div className={classes.tab}>
        <Box display="flex" flexWrap="nowrap">
          <NavLink exact to={`/${group_id}`} className={classes.tabLink}>
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
        {permissionWrite() && !pathname.endsWith("/new") && (
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
