import React from "react";
import HomeBoardNotice2 from "./HomeBoardNotice2";
import HomeBoardSuggestion2 from "./HomeBoardSuggestion2";
import { useBoards, useGroupId } from "../store/useGlobalState";
import { Board, Post } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import HomeBoardEvent2 from "./HomeBoardEvent2";
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  Hidden,
} from "@material-ui/core";
import HomeBoardVote2 from "./HomeBoardVote2";
import useDesktop from "./useDesktop";
import HomeMapPosts from "./HomeMapPosts";
import Chips from "./Chips";
import BoardMoreTag from "./BoardMoreTag";
import useTagPostsAll from "../store/useTagPostsAll";
import DisplayNone from "./DisplayNone";
const mapElement = (posts: Post[]) => {
  posts.sort(a => (a.is_announced ? -1 : 1));
  return (b: Board) => {
    const filteredPosts = posts.filter(p => p.board_id === b.id).slice(0, 4);
    if (filteredPosts.length === 0) return null;
    switch (b.type) {
      case "suggestion":
        return (
          <HomeBoardSuggestion2 key={b.id} board={b} posts={filteredPosts} />
        );
      case "notice":
        return <HomeBoardNotice2 key={b.id} board={b} posts={filteredPosts} />;
      case "vote":
        return <HomeBoardVote2 key={b.id} board={b} posts={filteredPosts} />;
      case "event":
        return <HomeBoardEvent2 key={b.id} board={b} posts={filteredPosts} />;
      default:
        return null;
    }
  };
};
export default function Home() {
  const [group_id] = useGroupId();
  const [boards] = useBoards();
  const [isDesktop] = useDesktop();
  useEffectBoardId();
  const [posts, chipData, setChipData] = useTagPostsAll();
  if (boards === undefined) return <LinearProgress />;
  if (!(boards && posts)) return null;
  const boardArr = boards?.map(mapElement(posts));
  return (
    <>
      <Chips chips={chipData} setChips={setChipData} />
      {posts?.length ? (
        <Grid container spacing={isDesktop ? 3 : 0}>
          <Grid item xs={isDesktop ? 8 : 12}>
            {boardArr}
          </Grid>
          <Grid item xs={isDesktop ? 4 : 12}>
            <Box mx={isDesktop ? 0 : 2} my={4} borderBottom="1px solid #bdbdbd">
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="h2" color="textPrimary">
                  <Box fontWeight="bold" my={isDesktop ? 0 : 4}>
                    지도보기
                  </Box>
                </Typography>
                <BoardMoreTag
                  label="지도"
                  viewLabel="크게 보기"
                  to={`/${group_id}/map`}
                />
              </Grid>
              <Box height={isDesktop ? 800 : "50vh"} mt={isDesktop ? 3 : 0}>
                <HomeMapPosts posts={posts} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <DisplayNone text="태그된 게시글이 없습니다." />
      )}
    </>
  );
}
