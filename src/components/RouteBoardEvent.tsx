import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Button } from "@material-ui/core";
import BoardPostEvent from "./BoardPostEvent";
import useTagPosts from "../store/useTagPosts";
import Chips from "./Chips";
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
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
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

export default function RouteBoardEvent({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isClosed, setClosed] = React.useState(false);
  const [posts, chipData, setChipData] = useTagPosts({
    board_id: b.id,
    isClosed,
  });
  return (
    <section className={classes.container}>
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
                예정 모임
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
                지난 모임
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
      <Grid container spacing={2}>
        {posts?.map((p, i) => (
          <Grid container item key={p.id} direction="column">
            <BoardPostEvent post={p} />
            {posts?.length !== i + 1 && <hr className={classes.divider} />}
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
