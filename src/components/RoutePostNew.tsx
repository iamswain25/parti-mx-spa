import React from "react";
import SuggestionNew from "./SuggestionNew";
import NoticeNew from "./NoticeNew";
import VoteNew from "./VoteNew";
import EventNew from "./EventNew";
import useBoard from "../store/useBoard";
import useEffectParams from "../store/useEffectParams";

export default function RoutePostNew() {
  const [b] = useBoard();
  useEffectParams();
  switch (b?.type) {
    case "notice":
      return <NoticeNew />;
    case "vote":
      return <VoteNew />;
    case "suggestion":
      return <SuggestionNew />;
    case "event":
      return <EventNew />;
    default:
      return null;
  }
}
