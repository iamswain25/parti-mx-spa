import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box } from "@material-ui/core";
import BoardPostVEvent from "./BoardPostEvent";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      marginBottom: 38,
      border: `1px solid ${grey[300]}`,
      maxWidth: 364,
    },
    titleContainer: {
      height: 57,
    },
    postContainer: {
      backgroundColor: grey[100],
      padding: theme.spacing(2),
      display: "grid",
      gridGap: theme.spacing(1.5),
    },
  };
});
export default function HomeBoardEvent({ board: b }: { board: Board }) {
  //   const [{ user_id }] = useStore();
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Typography variant="h2">
          <Box css={{ ml: 2 }}>{b.title}</Box>
        </Typography>
        <Typography variant="body2">
          더 보기
          <Box css={{ mr: 1 }}>
            <ChevronRightIcon style={{ color: grey[600], fontSize: 16 }} />
          </Box>
        </Typography>
      </Grid>
      <div className={classes.postContainer}>
        {b.posts.map((p, i) => (
          <BoardPostVEvent key={i} post={p} />
        ))}
      </div>
    </section>
  );
}
