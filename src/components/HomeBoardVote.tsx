import React from "react";
// import { useStore } from "../store/store";
// import useNavigateToPost from "./useNavigateToPost";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { grey } from "@material-ui/core/colors";
import BoardPostVote from "./BoardPostVote";
import { Typography, Grid, Box } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      marginBottom: 38,
      border: `1px solid ${grey[300]}`,
      maxWidth: 364,
      "& .custom-dot-list-style": {
        bottom: 24,
        "& .react-multi-carousel-dot button": {
          backgroundColor: grey[400],
          width: 8,
          height: 8,
          border: "none",
        },
        "& .react-multi-carousel-dot--active button": {
          backgroundColor: theme.palette.primary.dark,
          width: 12,
          height: 8,
          borderRadius: 4,
          border: "none",
        },
      },
    },
    titleContainer: {
      height: 57,
    },
    postContainer: { backgroundColor: grey[100] },
  };
});
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 600 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};
export default function HomeBoardVote({ board: b }: { board: Board }) {
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
        <Carousel
          responsive={responsive}
          showDots={true}
          dotListClass="custom-dot-list-style"
        >
          {b.posts.map((p, i) => (
            <BoardPostVote key={i} post={p} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
