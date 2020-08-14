import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { PageBoard, Post } from "../types";
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
import Forbidden from "./Forbidden";
import Chips from "./Chips";
import { defaultHashtags } from "../helpers/options";
import { ChipData } from "../types";
export default function RoutePhoto() {
  const { board_id } = useParams();
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const [sort] = useGlobalState(keys.SORT);
  const [chipData, setChipData] = React.useState<ChipData[]>(
    defaultHashtags.map((c) => ({ label: c, selected: false }))
  );
  const [posts, setPosts] = React.useState<Post[] | undefined>(undefined);
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
  React.useEffect(() => {
    if (board?.posts) {
      const selectedTags = chipData
        .filter((c) => c.selected)
        .map((c) => c.label);
      if (!selectedTags.length) {
        setPosts(board?.posts);
      } else {
        const selectedPosts = board?.posts.filter((p) =>
          selectedTags.every((t) => p.tags?.includes(t))
        );
        setPosts(selectedPosts);
      }
    }
  }, [board, chipData]);
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
              {posts?.length ?? 0}
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
          {posts?.map((p, i) => (
            <NavLink
              key={i}
              className={classes.aspectRatio}
              exact
              to={`/post/${p.id}`}
            >
              <Img
                src={[...(p.images?.map((i) => i.uri) || []), "/ogp.png"]}
                className={classes.img}
              />
            </NavLink>
          ))}
        </Box>
      </section>
    </>
  );
}
