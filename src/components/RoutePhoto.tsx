import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { PageBoard, Board } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import GroupLogoContainer from "./GroupLogoContainer";
import BoardTabNavigator from "./BoardTabNavigator";
import useDesktop from "./useDesktop";
import { useParams, NavLink } from "react-router-dom";
import GridOnIcon from "@material-ui/icons/GridOn";
import { Box, Grid, Typography } from "@material-ui/core";
import HeaderBoard from "./HeaderBoard";
import { postSortOptions } from "../helpers/options";
import { useGlobalState, keys } from "../store/useGlobalState";
import PostSort from "./PostSort";
import { useStyles } from "../helpers/styles";
import { Img } from "react-image";
import PinDropIcon from "@material-ui/icons/PinDrop";

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
  const [isDesktop] = useDesktop();
  const { group, group: { boards = [], title = "로딩 중" } = {}, ...b } =
    data?.mx_boards_by_pk || ({} as Board);
  return (
    <>
      <HeaderBoard title={title} />
      <Box mt={isDesktop ? 3 : 0} />
      {isDesktop && <GroupLogoContainer group={group} />}
      <BoardTabNavigator boards={boards} />
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Box display="flex">
            <Typography variant={isDesktop ? "h4" : "h5"} color="textPrimary">
              제안
            </Typography>
            <Box mr={1} />
            <Typography variant={isDesktop ? "h4" : "h5"} color="primary">
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
