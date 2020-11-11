import React from "react";
import SuggestionDetail from "./SuggestionDetail";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import EventDetail from "./EventDetail";
import usePost from "../store/usePost";
import { LinearProgress } from "@material-ui/core";
import Forbidden from "./Forbidden";
import useEffectGroupId from "../store/useEffectGroupId";
import useEffectBoardId from "../store/useEffectBoardId";
export default function RoutePost() {
  useEffectGroupId();
  useEffectBoardId();
  const [p] = usePost(true);
  if (p === undefined) {
    return <LinearProgress />;
  } else if (p === null) {
    return <Forbidden noPost />;
  }
  switch (p?.type) {
    case "notice":
      return <NoticeDetail post={p} />;
    case "vote":
      return <VoteDetail post={p} />;
    case "suggestion":
      return <SuggestionDetail post={p} />;
    case "event":
      return <EventDetail post={p} />;
    default:
      return <Forbidden noPost />;
  }
}
