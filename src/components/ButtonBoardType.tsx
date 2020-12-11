import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import useBoard from "../store/useBoard";
import { NavLink } from "react-router-dom";
import GridOnIcon from "@material-ui/icons/GridOn";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { useGroupId } from "../store/useGlobalState";
import PostSort from "./PostSort";
export const useStyles = makeStyles((theme: Theme) => ({
  smallIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0.5),
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "inherit",
    color: theme.palette.grey[300],
    "&.active": {
      color: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
    },
    "& svg": {
      width: 13,
      height: 13,
    },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.grey[300],
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("md")]: {},
  },
}));

export default function ButtonBoardType() {
  const [board] = useBoard();
  const [group_id] = useGroupId();
  const classes = useStyles();
  return (
    <Box display="flex">
      <PostSort />
      <NavLink
        exact
        className={classes.smallIcon}
        to={`/${group_id}/${board?.id}`}
      >
        <GridOnIcon />
      </NavLink>
      <NavLink
        exact
        className={classes.smallIcon}
        to={`/${group_id}/${board?.id}/map`}
      >
        <PinDropIcon />
      </NavLink>
    </Box>
  );
}
