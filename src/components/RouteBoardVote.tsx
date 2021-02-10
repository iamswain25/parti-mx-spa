import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import {
  Typography,
  Grid,
  Box,
  Button,
  LinearProgress,
} from "@material-ui/core";
import RoutePostVote from "./RoutePostVote";
import useTagPosts from "../store/useTagPosts";
import Chips from "./Chips";
import ButtonBoardType from "./ButtonBoardType";
import DisplayNone from "./DisplayNone";
const useStyles = makeStyles(theme => {
  return {
    root: { paddingBottom: theme.spacing(5) },
    titleContainer: {
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  };
});

export default function RouteBoardVote({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isClosed, setClosed] = React.useState(false);
  const [posts, chipData, setChipData] = useTagPosts({
    board_id: b.id,
    isClosed,
  });
  if (posts === undefined) {
    return <LinearProgress />;
  }
  return (
    <section className={classes.root}>
      <Chips chips={chipData} setChips={setChipData} />
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Box display="flex">
          <Button onClick={() => setClosed(false)} style={{ padding: 0 }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h4"
                color={isClosed ? "textSecondary" : "textPrimary"}
              >
                진행 중인 투표
              </Typography>
              <Box mr={1} />
              <Typography
                variant="h4"
                color={isClosed ? "primary" : "textSecondary"}
              >
                {b?.count_open || 0}
              </Typography>
            </Box>
          </Button>
          <Box mr={2} />
          <Button onClick={() => setClosed(true)} style={{ padding: 0 }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h4"
                color={isClosed ? "textPrimary" : "textSecondary"}
              >
                완료된 투표
              </Typography>
              <Box mr={1} />
              <Typography
                variant="h4"
                color={isClosed ? "primary" : "textSecondary"}
              >
                {b?.count_closed || 0}
              </Typography>
            </Box>
          </Button>
        </Box>
        <ButtonBoardType sort />
      </Grid>
      {posts?.length ? (
        posts?.map((p, i) => <RoutePostVote key={i} post={p} />)
      ) : (
        <DisplayNone text="태그된 게시글이 없습니다." />
      )}
    </section>
  );
}
