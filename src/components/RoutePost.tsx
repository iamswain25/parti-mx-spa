import React from "react";
import SuggestionDetail from "./SuggestionDetail";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import EventDetail from "./EventDetail";
import usePost from "../store/usePost";
import useEffectParams from "../store/useEffectParams";
import { useBoardId, useGroupId } from "../store/useGlobalState";
import { useParams } from "react-router-dom";

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
    if (boardId !== p.board_id) {
      setBoardId(p.board_id);
    }
  }, [groupId, group_id, setGroupId, p.board_id, boardId]);
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
