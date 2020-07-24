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

export default function RoutePostNew() {
  const { board_id } = useParams();
  const { data, error, loading } = useQuery<PageBoard>(queryBoardType, {
    variables: { board_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const b = data?.mx_boards_by_pk;
  if (loading) {
    return null;
  }
  if (!b) {
    return <Forbidden />;
  }
  let boardNew = null;
  switch (b.type) {
    case "notice":
      boardNew = <NoticeNew />;
      break;
    case "vote":
      boardNew = <VoteNew />;
      break;
    case "suggestion":
      boardNew = <SuggestionNew />;
      break;
    case "event":
      boardNew = <EventNew />;
      break;
    default:
      boardNew = <SuggestionNew />;
  }
  return boardNew;
}