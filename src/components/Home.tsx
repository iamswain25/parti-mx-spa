import React from "react";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import { useBoards, useGroupId } from "../store/useGlobalState";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import HomeBoardEvent from "./HomeBoardEvent";
import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";
import useDesktop from "./useDesktop";
import RouteMapPosts from "./RouteMapPosts";
import BoardMoreTag from "./BoardMoreTag";

export default function Home() {
  const [group_id] = useGroupId();
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
      {mapBoard && (
        <Grid item xs={isDesktop ? 4 : 12}>
          <Box
            mx={isDesktop ? undefined : 2}
            my={3}
            borderBottom="1px solid #bdbdbd"
            display={isDesktop ? undefined : "flex"}
            alignItems={isDesktop ? undefined : "center"}
            justifyContent={isDesktop ? undefined : "space-between"}
          >
            <Typography variant="h2" color="textPrimary">
              <Box fontWeight="bold">정책상상 지도보기</Box>
            </Typography>
            <Box
              mt={isDesktop ? 1 : undefined}
              pb={isDesktop ? 1 : undefined}
              display="flex"
              justifyContent="flex-end"
            >
              <BoardMoreTag
                label="지도"
                viewLabel="크게 보기"
                to={`/${group_id}/${mapBoard.id}/map`}
              />
            </Box>
          </Box>
          <Box height={isDesktop ? 800 : "50vh"} mt={isDesktop ? 3 : 0}>
            <RouteMapPosts board={mapBoard} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
