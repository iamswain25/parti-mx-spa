import React from "react";
import SuggestionEdit from "./SuggestionEdit";
import NoticeEdit from "./NoticeEdit";
import VoteEdit from "./VoteEdit";
import EventEdit from "./EventEdit";
import usePost from "../store/usePost";

export default function RoutePostEdit() {
  const [p] = usePost();
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
