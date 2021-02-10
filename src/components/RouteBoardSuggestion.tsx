import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Button } from "@material-ui/core";
import RoutePostSuggestion from "./RoutePostSuggestion";
import { useSort } from "../store/useGlobalState";
import ButtonBoardType from "./ButtonBoardType";
import useTagPosts from "../store/useTagPosts";
import Chips from "./Chips";
import DisplayNone from "./DisplayNone";
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
    margin: {
      marginBottom: theme.spacing(2),
    },
  };
});

export default function RouteBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isClosed, setClosed] = React.useState(false);
  const [sort] = useSort();
  const [posts, chipData, setChipData] = useTagPosts({
    board_id: b.id,
    isClosed,
    sort,
  });
  const announcedPosts = posts?.filter(p => p.is_announced);
  const normalPosts = posts?.filter(p => !p.is_announced);
  const showAnnouncement = announcedPosts && announcedPosts?.length > 0;
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
      <div className={classes.margin}>
        {showAnnouncement &&
          announcedPosts?.map(p => <RoutePostSuggestion key={p.id} post={p} />)}
      </div>
      {normalPosts?.length ? (
        normalPosts?.map(p => <RoutePostSuggestion key={p.id} post={p} />)
      ) : (
        <DisplayNone text="태그된 게시글이 없습니다." />
      )}
    </section>
  );
}
