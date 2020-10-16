import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { PageBoard } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useParams, NavLink } from "react-router-dom";
import GridOnIcon from "@material-ui/icons/GridOn";
import { Box, Grid, Typography } from "@material-ui/core";
import { postSortOptions } from "../helpers/options";
import { useGlobalState, keys } from "../store/useGlobalState";
import PostSort from "./PostSort";
import { useStyles } from "../helpers/styles";
import PinDropIcon from "@material-ui/icons/PinDrop";
import Forbidden from "./Forbidden";
import Chips from "./Chips";
import HomeBoardPhoto from "./HomeBoardPhoto";
import useHashtags from "./useHashtags";
export default function RoutePhoto() {
  const { board_id = 2 } = useParams<{ board_id: string }>();
  const [{ user_id }, dispatch] = useStore();
  const classes = useStyles();
  const [sort] = useGlobalState(keys.SORT);
  const [chipData, setChipData, selectedTags] = useHashtags();
  React.useEffect(() => {
    dispatch({ type: "SET_BOARD", board_id: Number(board_id) });
  }, [board_id, dispatch]);
  const { data, error, loading } = useQuery<PageBoard>(queryByBoardId, {
    variables: {
      board_id,
      user_id,
      isAnonymous: !user_id,
      sort: [postSortOptions[sort].sort],
      tags: selectedTags,
    },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const board = data?.mx_boards_by_pk;
  if (loading) {
    return null;
  }
  if (!board) {
    return <Forbidden />;
  }
  const { group, posts, posts_aggregate, ...b } = board;
  return (
    <>
      <section className={classes.container}>
        <Chips chips={chipData} setChips={setChipData} />
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Box display="flex">
            <Typography variant="h4" color="textPrimary">
              {b.title}
            </Typography>
            <Box mr={1} />
            <Typography variant="h4" color="primary">
              {posts_aggregate?.aggregate?.count ?? 0}
            </Typography>
          </Box>
          <Box display="flex">
            <PostSort />
            <NavLink
              isActive={(match, location) => {
                if (match) {
                  return true;
                }
                if (location.pathname === "/home") {
                  return true;
                } else {
                  return false;
                }
              }}
              exact
              to={`/photo/${board_id}`}
              className={classes.smallIcon}
            >
              <GridOnIcon />
            </NavLink>
            <NavLink
              exact
              to={`/map/${board_id}`}
              className={classes.smallIcon}
            >
              <PinDropIcon />
            </NavLink>
          </Box>
        </Grid>

        <Grid container spacing={1} className={classes.photoGrid}>
          {posts?.map((p, i) => (
            <HomeBoardPhoto key={i} p={p} />
          ))}
        </Grid>
      </section>
    </>
  );
}
