import React from "react";
import SuggestionDetail from "./SuggestionDetail";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import EventDetail from "./EventDetail";
import usePost from "../store/usePost";
import useEffectParams from "../store/useEffectParams";

export default function RoutePost() {
  const [p] = usePost(true);
  useEffectParams();
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
