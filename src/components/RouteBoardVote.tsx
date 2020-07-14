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
        // marginBottom: theme.spacing(5),
        maxWidth: 1200,
        paddingLeft: 30,
        paddingRight: 30,
        margin: "0 auto",
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
          <Button onClick={() => setClosed(false)} style={{ padding: 0 }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant={isDesktop ? "h2" : "h5"}
                color={isClosed ? "textSecondary" : "textPrimary"}
              >
                {/* {b?.title} */}
                진행 중인 투표
              </Typography>
              <Box mr={1} />
              <Box
                fontSize={isDesktop ? 20 : 14}
                color={isClosed ? "text.secondary" : "primary.main"}
              >
                {b?.posts_aggregate_open.aggregate.count}
              </Box>
            </Box>
          </Button>
          <Box mr={2} />
          <Button onClick={() => setClosed(true)} style={{ padding: 0 }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant={isDesktop ? "h2" : "h5"}
                color={isClosed ? "textPrimary" : "textSecondary"}
              >
                {/* {b?.title} */}
                완료 된 투표
              </Typography>
              <Box mr={1} />
              <Box
                fontSize={isDesktop ? 20 : 14}
                color={isClosed ? "primary.main" : "text.secondary"}
              >
                {b?.posts_aggregate_closed.aggregate.count}
              </Box>
            </Box>
          </Button>
        </Grid>
        {b?.posts
          .filter((a) => (typeof a.closed_at === "string") === isClosed)
          .map((p, i) => (
            <RoutePostVote key={i} post={p} />
          ))}
      </section>
    </>
  );
}
