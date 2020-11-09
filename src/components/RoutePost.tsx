import React from "react";
import SuggestionDetail from "./SuggestionDetail";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import EventDetail from "./EventDetail";
import usePost from "../store/usePost";
import { useBoardId, useGroupId } from "../store/useGlobalState";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import Forbidden from "./Forbidden";

export default function RoutePost() {
  const [p] = usePost(true);
  const { group_id } = useParams<{
    group_id: string;
  }>();
  const [groupId, setGroupId] = useGroupId();
  const [boardId, setBoardId] = useBoardId();
  React.useEffect(() => {
    if (group_id && group_id !== groupId) {
      setGroupId(group_id);
    }
    if (boardId !== p?.board_id) {
      setBoardId(p?.board_id);
    }
  }, [groupId, group_id, setGroupId, p, boardId, setBoardId]);
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
      return null;
  }
}
