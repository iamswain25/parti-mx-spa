import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Button } from "@material-ui/core";
import useDesktop from "./useDesktop";
import RoutePostVote from "./RoutePostVote";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5),
      },
    },
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

export default function RouteBoardVote({ board: b }: { board?: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();
  const [isClosed, setClosed] = React.useState(false);
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          // justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Button onClick={() => setClosed(false)}>
            <Box display="flex">
              <Typography variant={isDesktop ? "h2" : "h5"} color="textPrimary">
                {/* {b?.title} */}
                진행 중인 투표
              </Typography>
              <Box mr={1} />
              <Typography variant={isDesktop ? "h2" : "h5"} color="primary">
                {b?.posts_aggregate_open.aggregate.count}
              </Typography>
            </Box>
          </Button>
          <Box mr={2} />
          <Button onClick={() => setClosed(true)}>
            <Box display="flex">
              <Typography variant={isDesktop ? "h2" : "h5"} color="textPrimary">
                {/* {b?.title} */}
                완료 된 투표
              </Typography>
              <Box mr={1} />
              <Typography variant={isDesktop ? "h2" : "h5"} color="primary">
                {b?.posts_aggregate_closed.aggregate.count}
              </Typography>
            </Box>
          </Button>
        </Grid>
        <Box paddingX={isDesktop ? 0 : 2}>
          {b?.posts
            .filter((a) => (typeof a.closed_at === "string") === isClosed)
            .map((p, i) => (
              <RoutePostVote key={i} post={p} />
            ))}
        </Box>
      </section>
    </>
  );
}
