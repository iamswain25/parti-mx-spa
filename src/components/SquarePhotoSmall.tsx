import React from "react";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core";
import StorageImage from "./StorageImage";
import { Link } from "react-router-dom";
import { useBoards } from "../store/useGlobalState";
export const useStyles = makeStyles(theme => ({
  root: {
    cursor: "pointer",
    position: "absolute",
    left: theme.spacing(1),
    top: -theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1),
    zIndex: 999,
  },
  aspectRatio: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    overflow: "hidden",
    "&::before": {
      content: "''",
      paddingBottom: "100%",
      display: "inline-block",
      verticalAlign: "top",
    },
    "&>img": {
      objectFit: "cover",
      maxHeight: "100%",
      width: "100%",
      position: "absolute",
      height: "100%",
    },
  },
  hover: {
    [theme.breakpoints.up("md")]: {
      minWidth: "100px",
      width: "100%",
      position: "relative",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    "&>.title": { margin: theme.spacing(0.5, 0), fontSize: 16 },
  },
  full: {
    backgroundColor: theme.palette.grey[200],
    border: `solid 1px ${theme.palette.grey[300]}`,
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function SquarePhotoSmall({ p }: { p: Post }) {
  const classes = useStyles();
  const [boards] = useBoards();
  const board = React.useMemo(() => boards?.find(b => p.board_id === b.id), [
    boards,
    p,
  ]);
  return (
    <Link to={`/post/${p.id}`} className={classes.root}>
      <div className={classes.aspectRatio}>
        <StorageImage image={p?.images?.[0]} className={classes.full} />
      </div>
      <div className={classes.hover}>
        {board?.title}
        <div className="title">{p.title}</div>
      </div>
    </Link>
  );
}
