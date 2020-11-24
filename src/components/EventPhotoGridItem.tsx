import React from "react";
import { EventMetadata, Post } from "../types";
import { Grid, GridSize, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import StorageImage from "./StorageImage";
export const useStyles = makeStyles((theme) => ({
  img: {
    objectFit: "cover",
    maxHeight: "100%",
    width: "100%",
    position: "absolute",
    height: "100%",
  },
  aspectRatio: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    "&::before": {
      content: "''",
      paddingBottom: "65.85%",
      display: "inline-block",
      verticalAlign: "top",
    },
    "&>.floating": {
      position: "absolute",
      top: theme.spacing(1),
      left: theme.spacing(1),
      zIndex: 2,
      height: 28,
      padding: "6px 10px",
      borderRadius: 16,
      border: "solid 1px #8f8abf",
      backgroundColor: theme.palette.common.white,
      "&>div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 0.21,
        color: "#544f85",
      },
      "&>.closed": {
        opacity: 0.3,
      },
    },
  },
  container: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
      position: "relative",
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    "&>.title": {
      marginBottom: theme.spacing(0.5),
      paddingTop: theme.spacing(1),
    },
    "&>.place": {
      paddingTop: theme.spacing(1),
      fontSize: 12,
      letterSpacing: -0.3,
      color: "#8f8abf",
    },
    "&>.date": {
      fontSize: 12,
      letterSpacing: -0.6,
      color: theme.palette.grey[800],
      paddingTop: theme.spacing(1),
    },
  },
}));

export default function EventPhotoGridItem({
  p,
  xs = 6,
  md = 3,
}: {
  p: Post;
  xs?: GridSize;
  md?: GridSize;
}) {
  const classes = useStyles();
  const metadata = p.metadata as EventMetadata;
  return (
    <Grid item xs={xs} md={md}>
      <NavLink exact to={`/post/${p.id}`}>
        <div className={classes.aspectRatio}>
          <StorageImage image={p?.images?.[0]} />
          <div className={p.is_closed ? "floating closed" : "floating"}>
            <div>{p.is_closed ? "행사종료" : "모집 중"}</div>
          </div>
        </div>
        <div className={classes.container}>
          <div className="place">{metadata?.place}</div>
          <div className="title">
            <Typography variant="h3">{p.title}</Typography>
          </div>
          <div className="date">
            {metadata?.event_date.toDate().toLocaleString()}
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
