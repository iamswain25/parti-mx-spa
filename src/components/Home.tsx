import React from "react";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import HomeBoardVote from "./HomeBoardVote";
import HomeBoardEvent from "./HomeBoardEvent";
import useDesktop from "./useDesktop";
import useBoards from "../store/useBoards";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import { Grid } from "@material-ui/core";
import WidgetCampaigns from "./WidgetCampaigns";
import HomeMain from "./HomeMain";

export default function Home() {
  const [isDesktop] = useDesktop();
  const [boards] = useBoards();
  useEffectBoardId();
  const notice = boards.filter((b) => b.type === "notice");
  const suggestion = boards.filter((b) => b.type === "suggestion");
  const vote = boards.filter((b) => b.type === "vote");
  const event = boards.filter((b) => b.type === "event");
  return (
    <>
      {isDesktop ? (
        <Grid container spacing={isDesktop ? 3 : 0}>
          <Grid item xs={12} md={8}>
            <HomeMain />
            {notice?.map((b: Board) => (
              <HomeBoardNotice key={b.id} board={b} />
            ))}
            {suggestion?.map((b: Board) => (
              <HomeBoardSuggestion key={b.id} board={b} />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <WidgetCampaigns />
            {vote?.map((b: Board) => (
              <HomeBoardVote key={b.id} board={b} />
            ))}
            {event?.map((b: Board) => (
              <HomeBoardEvent key={b.id} board={b} />
            ))}
          </Grid>
        </Grid>
      ) : (
        //모바일
        <>
          <HomeMain />
          {notice?.map((b: Board) => (
            <HomeBoardNotice key={b.id} board={b} />
          ))}
          {vote?.map((b: Board) => (
            <HomeBoardVote key={b.id} board={b} />
          ))}
          {suggestion?.map((b: Board) => (
            <HomeBoardSuggestion key={b.id} board={b} />
          ))}
          {event?.map((b: Board) => (
            <HomeBoardEvent key={b.id} board={b} />
          ))}
          <WidgetCampaigns />
        </>
      )}
    </>
  );
}
