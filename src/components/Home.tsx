import React from "react";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import HomeBoardVote from "./HomeBoardVote";
import HomeBoardEvent from "./HomeBoardEvent";
import useDesktop from "./useDesktop";
import useBoards from "../store/useBoards";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import { Grid, LinearProgress } from "@material-ui/core";
import WidgetCampaigns from "./WidgetCampaigns";
import HomeMain from "./HomeMain";
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
  const [isDesktop] = useDesktop();
  const [boards] = useBoards();
  useEffectBoardId();

  if (boards === undefined) return <LinearProgress />;
  if (!boards) return null;
  if (isDesktop) {
    const wide = boards
      .filter((board) => ["notice", "suggestion"].includes(board?.type))
      .map(mapElement);

    const narrow = boards
      .filter((board) => ["vote", "event"].includes(board?.type))
      .map(mapElement);
    return (
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <HomeMain />
          {wide}
        </Grid>
        <Grid item xs={4}>
          <WidgetCampaigns />
          {narrow}
        </Grid>
      </Grid>
    );
  } else {
    const boardArr = boards?.map(mapElement);
    return (
      <>
        <HomeMain />
        {boardArr}
        <WidgetCampaigns />
      </>
    );
  }
}
