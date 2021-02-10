import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import useBoard from "../store/useBoard";
import MapPosts from "./MapPosts";
import ButtonBoardType from "./ButtonBoardType";
import useTagPosts from "../store/useTagPosts";
import Chips from "./Chips";
export const useStyles = makeStyles((theme: Theme) => ({
  smallIcon: {
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
  const [posts, chipData, setChipData] = useTagPosts({ board_id: board?.id });
  const classes = useStyles();
  //   const [sort] = useGlobalState(keys.SORT);
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
        <Box display="flex">
          <ButtonBoardType sort />
        </Box>
      </Grid>
      <div className={classes.mapContainer}>
        <MapPosts posts={posts} />
      </div>
    </section>
  );
}
