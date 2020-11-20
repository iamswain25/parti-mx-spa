import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Button } from "@material-ui/core";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import EventPhotoGridItem from "./EventPhotoGridItem";
import useBoardCounter from "../store/useBoardCounter";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      flex: 1,
      [theme.breakpoints.up("md")]: {
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 1200,
      },
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
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

export default function RouteBoardEvent({ board: b }: { board: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();
  const [isClosed, setClosed] = React.useState(false);
  const [posts] = usePosts({ board_id: b.id, isClosed });
  const [counter] = useBoardCounter({ board_id: b.id });
  return (
    <section className={classes.container}>
      <Grid container alignItems="center" className={classes.titleContainer}>
        <Button onClick={() => setClosed(false)} style={{ padding: 0 }}>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h4"
              color={isClosed ? "textSecondary" : "textPrimary"}
            >
              진행 예정 모임
            </Typography>
            <Box mr={1} />
            <Typography
              variant="h4"
              color={isClosed ? "textSecondary" : "primary"}
            >
              {counter?.count_open || 0}
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
              완료 된 모임
            </Typography>
            <Box mr={1} />
            <Typography
              variant="h4"
              color={isClosed ? "primary" : "textSecondary"}
            >
              {counter?.count_closed || 0}
            </Typography>
          </Box>
        </Button>
      </Grid>
      <Grid container spacing={isDesktop ? 3 : 2} className={classes.photoGrid}>
        {posts
          .filter((a) => (typeof a.closed_at === "string") === isClosed)
          .map((p) => (
            <EventPhotoGridItem p={p} md={3} xs={6} key={p.id} />
          ))}
      </Grid>
    </section>
  );
}
