import React from "react";
import HomeBoardNotice2 from "./HomeBoardNotice2";
import HomeBoardSuggestion2 from "./HomeBoardSuggestion2";
import { useBoards } from "../store/useGlobalState";
import { Board, Post } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import HomeBoardEvent2 from "./HomeBoardEvent2";
import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";
import HomeBoardVote2 from "./HomeBoardVote2";
import useDesktop from "./useDesktop";
import HomeMapPosts from "./HomeMapPosts";
import useAllPosts from "../store/useAllPosts";
import useTagChips from "./useTagChips";
import Chips from "./Chips";
const mapElement = (posts: Post[]) => {
  posts.sort(a => (a.is_announced ? -1 : 1));
  return (b: Board) => {
    switch (b.type) {
      case "suggestion":
        return (
          <HomeBoardSuggestion2
            key={b.id}
            board={b}
            posts={posts.filter(p => p.type === b.type).slice(0, 4)}
          />
        );
      case "notice":
        return (
          <HomeBoardNotice2
            key={b.id}
            board={b}
            posts={posts.filter(p => p.type === b.type).slice(0, 4)}
          />
        );
      case "vote":
        return (
          <HomeBoardVote2
            key={b.id}
            board={b}
            posts={posts.filter(p => p.type === b.type).slice(0, 4)}
          />
        );
      case "event":
        return (
          <HomeBoardEvent2
            key={b.id}
            board={b}
            posts={posts.filter(p => p.type === b.type).slice(0, 4)}
          />
        );
      default:
        return null;
    }
  };
};
export default function Home() {
  const [boards] = useBoards();
  const [posts] = useAllPosts();
  const [isDesktop] = useDesktop();
  useEffectBoardId();
  const [chipData, setChipData] = useTagChips(posts);
  const selectedTags = React.useMemo(
    () => chipData?.filter(c => c.selected).map(c => c.label),
    [chipData],
  );
  const selectedPosts = React.useMemo(
    () =>
      selectedTags?.length
        ? posts?.filter(p =>
            selectedTags?.every((t: string) => p.tags?.includes(t)),
          )
        : posts,
    [selectedTags, posts],
  );

  if (boards === undefined) return <LinearProgress />;
  if (!(boards && selectedPosts)) return null;
  const boardArr = boards?.map(mapElement(selectedPosts));
  return (
    <>
      <Chips chips={chipData} setChips={setChipData} />
      <Grid container spacing={isDesktop ? 3 : 0}>
        <Grid item xs={isDesktop ? 8 : 12}>
          {boardArr}
        </Grid>
        <Grid item xs={isDesktop ? 4 : 12}>
          <Box
            mx={isDesktop ? 0 : 2}
            my={3}
            borderBottom="1px solid #bdbdbd"
            display={isDesktop ? undefined : "flex"}
            alignItems={isDesktop ? undefined : "center"}
            justifyContent={isDesktop ? undefined : "space-between"}
          >
            <Typography variant="h2" color="textPrimary">
              <Box fontWeight="bold">지도보기</Box>
            </Typography>
            <Box height={isDesktop ? 800 : "50vh"} mt={isDesktop ? 3 : 0}>
              {selectedPosts?.length && <HomeMapPosts posts={selectedPosts} />}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
