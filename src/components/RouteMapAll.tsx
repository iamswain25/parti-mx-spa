import React from "react";
import { Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import useTagPostsAll from "../store/useTagPostsAll";
import MapPosts from "./MapPosts";
import Chips from "./Chips";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { Link } from "react-router-dom";
export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  titleContainer: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  mapContainer: {
    height: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 2}px)`,
    width: "100%",
    display: "flex",
    flex: 1,
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("md")]: {},
  },
}));

export default function RouteMapAll() {
  const classes = useStyles();
  const [posts, chipData, setChipData] = useTagPostsAll();
  return (
    <section className={classes.container}>
      <Chips chips={chipData} setChips={setChipData} />

      <Grid
        container
        className={classes.titleContainer}
        alignItems="center"
        component={Link}
        to="./"
      >
        <KeyboardArrowLeftIcon fontSize="large" />
        <Typography variant="h2" color="textPrimary">
          지도보기
        </Typography>
      </Grid>
      <div className={classes.mapContainer}>
        {posts?.length && <MapPosts posts={posts} />}
      </div>
    </section>
  );
}
