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
import usePermEffect from "./usePermEffect";
import permissionBlocked from "./permissionBlocked";

export default function RoutePostNew() {
  const { board_id } = useParams<{ board_id: string }>();
  const { data, error, loading } = useQuery<PageBoard>(queryBoardType, {
    variables: { board_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const b = data?.mx_boards_by_pk;
  const userStatus = b?.group?.status;
  usePermEffect(userStatus);
  if (loading) return null;
  if (!b) return <Forbidden />;
  if (permissionBlocked(b.permission, userStatus)) return <Forbidden />;

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
