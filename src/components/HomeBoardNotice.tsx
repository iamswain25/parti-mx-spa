import React from "react";
// import { useStore } from "../store/store";
// import useNavigateToPost from "./useNavigateToPost";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { grey } from "@material-ui/core/colors";
import BoardPostNotice from "./BoardPostNotice";
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
    flexrowleft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  };
});

export default function HomeBoardNotice({ board: b }: { board: Board }) {
  //   const [{ user_id }] = useStore();
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
      <div>
        {b.posts.map((p, i) => (
          <BoardPostNotice key={i} post={p} />
        ))}
      </div>
    </section>
  );
}
