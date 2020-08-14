import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { PageBoard, Post } from "../types";
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
import { Img } from "react-image";
import PinDropIcon from "@material-ui/icons/PinDrop";
import Forbidden from "./Forbidden";
import Chips from "./Chips";
import { defaultHashtags } from "../helpers/options";
import { ChipData } from "../types";
export default function RoutePhoto() {
  const { board_id = 2 } = useParams();
  const [{ user_id }, dispatch] = useStore();
  const classes = useStyles();
  const [sort] = useGlobalState(keys.SORT);
  const [chipData, setChipData] = React.useState<ChipData[]>(
    defaultHashtags.map((c) => ({ label: c, selected: false }))
  );
  React.useEffect(() => {
    dispatch({ type: "SET_BOARD", board_id: Number(board_id) });
  }, [board_id, dispatch]);
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
            <Grid item key={i} xs={6} md={3}>
              <NavLink
                className={classes.aspectRatio}
                exact
                to={`/post/${p.id}`}
              >
                <Img
                  src={[...(p.images?.map((i) => i.uri) || []), "/ogp.png"]}
                  className={classes.img}
                />
                <div className={classes.hover}>
                  <div>
                    <Typography variant="h3">{p.title}</Typography>
                  </div>
                  <Typography variant="h6" color="primary">
                    <Grid container>
                      {p?.tags?.map((chip) => {
                        return <span key={chip}>#{chip}&nbsp;</span>;
                      })}
                    </Grid>
                  </Typography>
                </div>
              </NavLink>
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  );
}
