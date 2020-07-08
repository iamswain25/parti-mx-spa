import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { grey } from "@material-ui/core/colors";
import BoardPostSuggestion from "./BoardPostSuggestion";
import { Typography, Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => {
  return {
    container: { marginBottom: 41 },
    title: {
      height: 24,
    },
    titleContainer: {
      height: 57,
      borderBottom: `1px solid ${grey[400]}`,
    },
    postContainer: {
      display: "grid",
      gridTemplateColumns: "calc(50% - 12px) calc(50% - 12px)",
      // gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      // display: "flex",
      paddingTop: 24,
      gridGap: 24,
    },
  };
});

export default function HomeBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <span>
          <Typography variant="h2" className={classes.title}>
            {b.title}
          </Typography>
        </span>
        <span>
          <Grid direction="row" container>
            <Typography variant="body2">더 보기</Typography>
            <ChevronRightIcon style={{ color: grey[600], fontSize: 16 }} />
          </Grid>
        </span>
      </Grid>
      <div className={classes.postContainer}>
        {b.posts.map((p, i) => (
          <BoardPostSuggestion key={i} post={p} />
        ))}
      </div>
    </section>
  );
}
