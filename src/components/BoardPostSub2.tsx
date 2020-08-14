import React from "react";
import { Post } from "../types";
import { semanticDate } from "../helpers/datefns";
import { Typography, Box } from "@material-ui/core";
export default function BoardPostSub2({ post: p }: { post: Post }) {
  const isVote = p.board.type === "vote";
  const likeCount = p?.users_aggregate?.aggregate?.sum?.like_count ?? 0;
  const commentCount = p?.comments_aggregate?.aggregate?.count ?? 0;
  return (
    <Box color="grey.600">
      <Typography variant="body2">
        <Box component="span" mr={1}>
          {p?.createdBy?.name}
        </Box>
        <Box component="span" mr={1}>
          {semanticDate(p.created_at)}
        </Box>
        <Box component="span" mr={1}>
          댓글 {commentCount}
        </Box>
        <Box component="span" mr={1}>
          {isVote ? `참여자 ${likeCount}명` : `Like ${likeCount}`}
        </Box>
      </Typography>
    </Box>
  );
}
