import React from "react";
import SuggestionDetail from "./SuggestionDetail";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import EventDetail from "./EventDetail";
import usePost from "../store/usePost";
import { LinearProgress } from "@material-ui/core";
import Forbidden from "./Forbidden";
import { useBoardId, useGroupId } from "../store/useGlobalState";
import { Post, VoteMetadata } from "../types";
export default function RoutePost() {
  const boardState = useBoardId();
  const groupState = useGroupId();
  const [p] = usePost();
  React.useEffect(() => {
    const [id, set] = boardState;
    if (p && p.board_id !== id) {
      set(p.board_id);
    }
  }, [p, boardState]);
  React.useEffect(() => {
    const [id, set] = groupState;
    if (p && p.group_id !== id) {
      set(p.group_id);
    }
  }, [p, groupState]);
  if (p === undefined) {
    return <LinearProgress />;
  } else if (p === null) {
    return <Forbidden noPost />;
  }
  switch (p?.type) {
    case "notice":
      return <NoticeDetail post={p} />;
    case "vote":
      return <VoteDetail post={p as Post<VoteMetadata>} />;
    case "suggestion":
      return <SuggestionDetail post={p} />;
    case "event":
      return <EventDetail post={p} />;
    default:
      return <Forbidden noPost />;
  }
}
