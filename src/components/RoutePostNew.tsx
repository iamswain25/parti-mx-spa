import React from "react";

import { PageBoard } from "../types";

import useErrorEffect from "./useErrorEffect";
import { useParams } from "react-router-dom";
import SuggestionNew from "./SuggestionNew";
import NoticeNew from "./NoticeNew";
import VoteNew from "./VoteNew";
import Forbidden from "./Forbidden";
import EventNew from "./EventNew";
import usePermEffect from "./usePermEffect";
import permissionBlocked from "./permissionBlocked";
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
