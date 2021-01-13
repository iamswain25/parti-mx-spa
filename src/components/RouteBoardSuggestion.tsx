import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Button } from "@material-ui/core";
import RoutePostSuggestion from "./RoutePostSuggestion";
import usePosts from "../store/usePosts";
import PostSort from "./PostSort";
import { useSort } from "../store/useGlobalState";
import ButtonBoardType from "./ButtonBoardType";
const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[300]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  };
});

export default function RouteBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isClosed, setClosed] = React.useState(false);
  const [sort] = useSort();
  const [posts] = usePosts({ board_id: b.id, isClosed, sort });
  return (
    <section className={classes.container}>
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
                진행 중인 제안
              </Typography>
              <Box mr={1} />
              <Typography
                variant="h4"
                color={isClosed ? "textSecondary" : "primary"}
              >
                {b.count_open || 0}
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
                완료된 제안
              </Typography>
              <Box mr={1} />
              <Typography
                variant="h4"
                color={isClosed ? "primary" : "textSecondary"}
              >
                {b.count_closed || 0}
              </Typography>
            </Box>
          </Button>
        </Box>
        <ButtonBoardType sort />
      </Grid>
      {posts?.map(p => (
        <RoutePostSuggestion key={p.id} post={p} />
      ))}
    </section>
  );
}
