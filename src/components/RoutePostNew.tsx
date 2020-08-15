import React from "react";
import { queryBoardType } from "../graphql/query";
import { PageBoard } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useParams } from "react-router-dom";
import SuggestionNew from "./SuggestionNew";
import NoticeNew from "./NoticeNew";
import VoteNew from "./VoteNew";
import Forbidden from "./Forbidden";
import EventNew from "./EventNew";
import permissionBlocked from "./permissionBlocked";
import { useGlobalState, keys } from "../store/useGlobalState";

export default function RoutePostNew() {
  const { board_id } = useParams();
  const { data, error, loading } = useQuery<PageBoard>(queryBoardType, {
    variables: { board_id },
    fetchPolicy: "network-only",
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const [userStatus] = useGlobalState(keys.PERMISSION);
  const b = data?.mx_boards_by_pk;
  if (loading) {
    return null;
  }
  if (!b) {
    return <Forbidden />;
  }
  if (b.type === "notice" && userStatus !== "organizer") {
    // 오거나이저만 소식 게시 가능
    return <Forbidden />;
  }
  if (permissionBlocked(b.permission, userStatus)) {
    return <Forbidden />;
  }
  switch (b.type) {
    case "notice":
      return <NoticeNew />;
    case "vote":
      return <VoteNew />;
    case "suggestion":
      return <SuggestionNew />;
    case "event":
      return <EventNew />;
    default:
      return <SuggestionNew />;
  }
}
