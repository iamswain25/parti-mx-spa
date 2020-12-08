import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import { DEFAULT_HASHTAGS } from "../helpers/options";
import { ChipData } from "../types";
import Chips from "./Chips";
import useBoard from "../store/useBoard";
import RouteMapPosts from "./RouteMapPosts";
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

export default function RouteMap() {
  const [board] = useBoard();
  const classes = useStyles();
  const [chipData, setChipData] = React.useState<ChipData[]>(
    DEFAULT_HASHTAGS.map((c) => ({ label: c, selected: false }))
  );
  return (
    <section className={classes.container}>
      <Chips chips={chipData} setChips={setChipData} />
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Box display="flex">
          <Typography variant="h4" color="textPrimary">
            {board?.title}
          </Typography>
          <Box mr={1} />
          <Typography variant="h4" color="primary">
            {board?.count_post ?? 0}
          </Typography>
        </Box>
      </Grid>
      <div className={classes.mapContainer}>
        {board && <RouteMapPosts board={board} chipData={chipData} />}
      </div>
    </section>
  );
}
