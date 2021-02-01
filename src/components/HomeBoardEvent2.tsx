import React from "react";
import { Board, Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box } from "@material-ui/core";
import BoardPostEvent from "./BoardPostEvent";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import { useGroupId } from "../store/useGlobalState";
const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
      },
      paddingBottom: theme.spacing(5),
    },
    titleContainer: {
      borderBottom: "1px solid " + theme.palette.grey[400],
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      "&>.flex-end": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      },
    },
    mobileMore: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(2),
    },
    divider: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      marginTop: theme.spacing(1),
      borderTopColor: theme.palette.divider,
    },
  };
});

export default function HomeBoardEvent2({
  board: b,
  posts,
}: {
  board: Board;
  posts: Post[];
}) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const [group_id] = useGroupId();
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography variant="h2" color="textPrimary">
            <Box fontWeight="bold">{b?.title}</Box>
          </Typography>
          <div className="flex-end">
            {isDesktop && <BoardMoreTag to={`/${group_id}/${b.id}`} />}
          </div>
        </Grid>
        <Box mt={2}>
          <Grid container spacing={2}>
            {posts?.map((p, i) => (
              <Grid container item key={p.id} direction="column">
                <BoardPostEvent post={p} />
                {posts?.length !== i + 1 && <hr className={classes.divider} />}
              </Grid>
            ))}
          </Grid>
        </Box>
        <div className={classes.mobileMore}>
          <BoardMoreTag label={b?.title} to={`/${group_id}/${b.id}`} />
        </div>
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
