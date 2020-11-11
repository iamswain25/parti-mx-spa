import React from "react";
import SuggestionEdit from "./SuggestionEdit";
import NoticeEdit from "./NoticeEdit";
import VoteEdit from "./VoteEdit";
import EventEdit from "./EventEdit";
import usePost from "../store/usePost";
import useGoBack from "./useGoBack";
import { LinearProgress } from "@material-ui/core";
import Forbidden from "./Forbidden";
import { useBoardId, useGroupId, useRole } from "../store/useGlobalState";

export default function RoutePostEdit() {
  const boardState = useBoardId();
  const groupState = useGroupId();
  const [p] = usePost(true);
  const goBack = useGoBack();
  const [role] = useRole();
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
  React.useEffect(() => {
    if (role === "organizer") return;
    else if (p) {
      const input = window.prompt("비밀번호 4자리를 입력해 주세요.");
      if (input !== p.password) {
        alert("비밀번호가 맞지 않아 수정이 불가합니다");
        goBack();
      }
    }
  }, [role, p, goBack]);
  if (p === undefined) {
    return <LinearProgress />;
  } else if (p === null) {
    return <Forbidden noPost />;
  }
  switch (p?.type) {
    case "notice":
      return <NoticeEdit post={p} />;
    case "vote":
      return <VoteEdit post={p} />;
    case "suggestion":
      return <SuggestionEdit post={p} />;
    case "event":
      return <EventEdit post={p} />;
    default:
      return null;
  }
}
