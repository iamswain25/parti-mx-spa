import React from "react";
import { Post } from "../types";
import { semanticDate } from "../helpers/datefns";
import { Typography, Box } from "@material-ui/core";
export default function BoardPostSub2({ post: p }: { post: Post }) {
  const isVote = p.type === "vote";
  const likeCount = p.count_like || 0;
  const commentCount = p.count_comment || 0;
  const name = p?.name;
  const alteredName =
    name?.indexOf("@") > 0 ? name?.substr(0, name?.indexOf("@")) : name;
  return (
    <Box color="grey.600">
      <Typography variant="body2">
        <Box component="span" mr={1}>
          {alteredName || "익명"}
        </Box>
        <Box component="span" mr={1}>
          {semanticDate(p.created_at)}
        </Box>
        <Box component="span" mr={1}>
          댓글 {commentCount}
        </Box>
        <Box component="span" mr={1}>
          {isVote ? `참여자 ${likeCount}명` : `공감 ${likeCount}`}
        </Box>
      </Typography>
    </Box>
  );
}
