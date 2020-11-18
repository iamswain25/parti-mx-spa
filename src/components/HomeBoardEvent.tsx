import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useGroupId } from "../store/useGlobalState";
import EventPhotoGridItem from "./EventPhotoGridItem";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      flex: 1,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(5),
    },
    titleContainer: {
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      "&>.space-between": {
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
    photoGrid: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
      },
    },
  };
});

export default function HomeBoardEvent({ board: b }: { board: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();
  const [group_id] = useGroupId();
  const [posts] = usePosts({ board_id: b.id });
  return (
    <>
      <section className={classes.container}>
        <div className={classes.titleContainer}>
          <Typography variant="h2" color="textPrimary">
            <Box fontWeight="bold">{b?.title}</Box>
          </Typography>
          <div className="space-between">
            <div>{b?.body}</div>
            {isDesktop && (
              <BoardMoreTag label={b?.title} to={`/${group_id}/${b.id}`} />
            )}
          </div>
        </div>
        <Grid
          container
          spacing={isDesktop ? 3 : 2}
          className={classes.photoGrid}
        >
          {posts?.map((p) => (
            <EventPhotoGridItem key={p.id} p={p} md={3} xs={6} />
          ))}
        </Grid>
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
