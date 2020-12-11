import React from "react";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import { useBoards } from "../store/useGlobalState";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import HomeBoardEvent from "./HomeBoardEvent";
import { Box, Grid, LinearProgress } from "@material-ui/core";
import useDesktop from "./useDesktop";
import RouteMapPosts from "./RouteMapPosts";

export default function Home() {
  const [boards] = useBoards();
  const [isDesktop] = useDesktop();
  useEffectBoardId();
  const boardArr = boards?.map((b: Board) => {
    switch (b.type) {
      case "suggestion":
        return <HomeBoardSuggestion key={b.id} board={b} />;
      case "notice":
      case "vote":
        return <HomeBoardNotice key={b.id} board={b} />;
      case "event":
        return <HomeBoardEvent key={b.id} board={b} />;
      // return <HomeBoardVote key={i} board={b} />;
      default:
        return null;
    }
  });
  const mapBoard = boards?.find((b) => b.type === "notice");
  if (boardArr === undefined) {
    return <LinearProgress />;
  }
  return (
    <Grid container spacing={isDesktop ? 3 : 0}>
      <Grid item xs={isDesktop ? 8 : 12}>
        {boardArr}
      </Grid>
      <Grid item xs={isDesktop ? 4 : 12}>
        <Box height={isDesktop ? 800 : "50vh"} mt={isDesktop ? 3 : 0}>
          {mapBoard && <RouteMapPosts board={mapBoard} />}
        </Box>
      </Grid>
    </Grid>
  );
}
