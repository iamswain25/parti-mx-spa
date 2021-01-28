import React from "react";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import { useBoards } from "../store/useGlobalState";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import HomeBoardEvent from "./HomeBoardEvent";
import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";
import HomeBoardVote from "./HomeBoardVote";
import useDesktop from "./useDesktop";
import HomeMapPosts from "./HomeMapPosts";
import useAllPosts from "../store/useAllPosts";
function mapElement(b: Board) {
  switch (b.type) {
    case "suggestion":
      return <HomeBoardSuggestion key={b.id} board={b} />;
    case "notice":
      return <HomeBoardNotice key={b.id} board={b} />;
    case "vote":
      return <HomeBoardVote key={b.id} board={b} />;
    case "event":
      return <HomeBoardEvent key={b.id} board={b} />;
    default:
      return null;
  }
}
export default function Home() {
  const [boards] = useBoards();
  const [posts] = useAllPosts();
  const [isDesktop] = useDesktop();
  useEffectBoardId();

  if (boards === undefined) return <LinearProgress />;
  if (!boards) return null;
  const boardArr = boards?.map(mapElement);
  return (
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
            {posts?.length && <HomeMapPosts posts={posts} />}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
