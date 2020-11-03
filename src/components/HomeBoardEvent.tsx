import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Divider } from "@material-ui/core";
import BoardPostEvent from "./BoardPostEvent";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useGroupId } from "../store/useGlobalState";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        border: `1px solid ${grey[300]}`,
        maxWidth: 364,
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
      },
      backgroundColor: theme.palette.background.default,
    },
    titleContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    postContainer: {
      overflow: "hidden",
      display: "grid",
      gridGap: theme.spacing(1.5),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        paddingRight: theme.spacing(2),
      },
    },
  };
});

export default function HomeBoardEvent({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const [group_id] = useGroupId();
  const [posts] = usePosts({ board_id: b.id });
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography variant="h2" color="textPrimary">
            <Box ml={isDesktop ? 2 : 0} fontWeight="bold">
              {b.title}
            </Box>
          </Typography>
          {isDesktop && (
            <Box mr={1}>
              <BoardMoreTag to={`/${group_id}/${b.id}`} />
            </Box>
          )}
        </Grid>
        {isDesktop && <Divider light />}
        <div className={classes.postContainer}>
          {posts.map((p, i) => (
            <BoardPostEvent key={i} post={p} />
          ))}
        </div>
        {!isDesktop && <BoardMoreTag to={`/${group_id}/${b.id}`} />}
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
