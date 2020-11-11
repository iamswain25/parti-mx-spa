import React from "react";
import SuggestionNew from "./SuggestionNew";
import NoticeNew from "./NoticeNew";
import VoteNew from "./VoteNew";
import EventNew from "./EventNew";
import useBoard from "../store/useBoard";
import { LinearProgress } from "@material-ui/core";
import Forbidden from "./Forbidden";
import { useRole } from "../store/useGlobalState";

export default function RoutePostNew() {
  const [b] = useBoard();
  const [role] = useRole();
  if (b === undefined) {
    return <LinearProgress />;
  } else if (b === null) {
    return <Forbidden noBoard />;
  } else {
    if (!role || !b?.permission?.create?.includes(role)) {
      return <Forbidden />;
    }
  }
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
