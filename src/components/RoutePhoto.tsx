import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { PageBoard } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import BoardTabNavigator from "./BoardTabNavigator";
import { useParams, NavLink } from "react-router-dom";
import GridOnIcon from "@material-ui/icons/GridOn";
import { Box, Grid, Typography } from "@material-ui/core";
import { postSortOptions } from "../helpers/options";
import { useGlobalState, keys } from "../store/useGlobalState";
import PostSort from "./PostSort";
import { useStyles } from "../helpers/styles";
import { Img } from "react-image";
import PinDropIcon from "@material-ui/icons/PinDrop";
import usePermEffect from "./usePermEffect";
import Forbidden from "./Forbidden";

export default function RoutePhoto() {
  const { board_id } = useParams();
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const [sort] = useGlobalState(keys.SORT);
  const { data, error, loading } = useQuery<PageBoard>(queryByBoardId, {
    variables: {
      board_id,
      user_id,
      isAnonymous: !user_id,
      sort: [postSortOptions[sort]],
    },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const board = data?.mx_boards_by_pk;
  usePermEffect(board?.group?.users?.[0]?.status);
  if (loading) {
    return null;
  }
  if (!board) {
    return <Forbidden />;
  }
  const { group, ...b } = board;
  return (
    <>
      <BoardTabNavigator board={board} />
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Box display="flex">
            <Typography variant="h4" color="textPrimary">
              제안
            </Typography>
            <Box mr={1} />
            <Typography variant="h4" color="primary">
              {b?.posts_aggregate?.aggregate?.count}
            </Typography>
          </Box>
          <Box display="flex">
            <PostSort />
            <NavLink
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
        <Box className={classes.photoGrid}>
          {b?.posts?.map((p, i) => (
            <NavLink
              key={i}
              className={classes.aspectRatio}
              exact
              to={`/post/${p.id}`}
            >
              <Img
                src={[...(p.images?.map((i) => i.uri) || []), "/favicon.ico"]}
                className={classes.img}
              />
            </NavLink>
          ))}
        </Box>
      </section>
    </>
  );
}
