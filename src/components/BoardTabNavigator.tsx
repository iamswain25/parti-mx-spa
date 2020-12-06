import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import {
  useBoardId,
  useBoards,
  useGroupId,
  useRole,
} from "../store/useGlobalState";
const useStyles = makeStyles((theme) => {
  return {
    fab: {
      position: "fixed",
      zIndex: theme.zIndex.speedDial,
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    btn: {
      display: "flex",
      alignItems: "center",
      "& button": {
        width: 98,
        padding: 0,
        height: 38,
      },
    },
  };
});

export default function BoardTabNavigator() {
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
    const board = boards?.find((b) => b.id === board_id);
    if (board && role) {
      return board.permission?.create?.includes(role);
    }
    return false;
  }
  if (permissionWrite() && !pathname.endsWith("/new"))
    return (
      <Fab
        color="primary"
        aria-label="write"
        className={classes.fab}
        onClick={btnHandler}
      >
        <CreateIcon />
      </Fab>
    );
  return null;
}
