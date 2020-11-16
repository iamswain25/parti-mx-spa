import React from "react";
import { Post } from "../types";
import { useStyles } from "../helpers/styles";
import { LazyImage } from "react-lazy-images";
import { Grid, GridSize, Hidden, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
export default function HomeBoardPhoto({
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
      <NavLink className={classes.aspectRatio} exact to={`/post/${p.id}`}>
        <LazyImage
          alt={p.title}
          placeholder={({ imageProps, ref }) => (
            <div ref={ref} className={classes.img} />
          )}
          src={p?.images?.[0]?.uri || "/ogp.png"}
          actual={({ imageProps }) => (
            <img {...imageProps} alt={imageProps.alt} className={classes.img} />
          )}
        />
        <div className={classes.hover}>
          <div>
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
      <Hidden mdUp implementation="css">
        <NavLink exact to={`/post/${p.id}`}>
          <div style={{ paddingTop: 4 }}>
            <Typography variant="h4">{p.title}</Typography>
          </div>
          <Typography variant="h5" color="primary">
            <Grid container style={{ paddingTop: 4 }}>
              {p?.tags?.map((chip) => {
                return <span key={chip}>#{chip}&nbsp;</span>;
              })}
            </Grid>
          </Typography>
        </NavLink>
      </Hidden>
    </Grid>
  );
}
