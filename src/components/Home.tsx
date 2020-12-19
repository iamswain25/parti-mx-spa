import React from "react";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import { useBoards } from "../store/useGlobalState";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import HomeBoardEvent from "./HomeBoardEvent";
import { Grid, LinearProgress } from "@material-ui/core";
import HomeBoardVote from "./HomeBoardVote";
import useDesktop from "./useDesktop";
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
  const [isDesktop] = useDesktop();
  useEffectBoardId();

  if (boards === undefined) return <LinearProgress />;
  if (!boards) return null;
  if (isDesktop) {
    const wide = boards
      .filter(board => ["notice", "suggestion"].includes(board?.type))
      .map(mapElement);

    const narrow = boards
      .filter(board => ["vote", "event"].includes(board?.type))
      .map(mapElement);
    return (
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {wide}
        </Grid>
        <Grid item xs={4}>
          {narrow}
        </Grid>
      </Grid>
    );
  } else {
    const boardArr = boards?.map(mapElement);
    return <>{boardArr}</>;
  }
}
