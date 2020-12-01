import React from "react";
import { Post } from "../types";
import { Grid, GridSize, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import StorageImage from "./StorageImage";
export const useStyles = makeStyles((theme) => ({
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
      width: "100%",
      position: "relative",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    "&>.title": { marginBottom: theme.spacing(0.5) },
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

export default function SquarePhoto({
  p,
  xs = 6,
  md = 3,
}: {
  p: Post;
  xs?: GridSize;
  md?: GridSize;
}) {
  const classes = useStyles();
  return (
    <Grid item xs={xs} md={md}>
      <NavLink exact to={`/post/${p.id}`}>
        <div className={classes.aspectRatio}>
          <StorageImage image={p?.images?.[0]} className={classes.full} />
        </div>
        <div className={classes.hover}>
          <div className="title">
            <Typography variant="h3">{p.title}</Typography>
          </div>
          <Typography variant="h6" color="primary">
            <Grid container>
              {p?.tags?.map((chip) => {
                return <span key={chip}>#{chip}&nbsp;</span>;
              })}
            </Grid>
          </Typography>
        </div>
      </NavLink>
    </Grid>
  );
}