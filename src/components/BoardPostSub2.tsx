import React from "react";
import { Post } from "../types";
import { semanticDate } from "../helpers/datefns";
import { Typography, Box } from "@material-ui/core";
const margin = { mr: 1 };
export default function BoardPostSub2({ post: p }: { post: Post }) {
  return (
    <Typography variant="subtitle2">
      <Box component="span" css={margin}>
        {p.createdBy.name}
      </Box>
      <Box component="span" css={margin}>
        {semanticDate(p.created_at)}
      </Box>
      <Box component="span" css={margin}>
        댓글 {p.comments_aggregate.aggregate.count}
      </Box>
      <Box component="span" css={margin}>
        공감 {p.users_aggregate.aggregate.sum.like_count}
      </Box>
    </Typography>
  );
}
