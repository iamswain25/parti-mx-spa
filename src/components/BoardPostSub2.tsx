import React from "react";
import { Post } from "../types";
import { semanticDate } from "../helpers/datefns";
import { Typography, Box } from "@material-ui/core";
export default function BoardPostSub2({ post: p }: { post: Post }) {
  return (
    <Box color="grey.600">
      <Typography variant="subtitle2">
        <Box component="span" mr={1}>
          {p.createdBy.name}
        </Box>
        <Box component="span" mr={1}>
          {semanticDate(p.created_at)}
        </Box>
        <Box component="span" mr={1}>
          댓글 {p.comments_aggregate.aggregate.count}
        </Box>
        <Box component="span" mr={1}>
          공감 {p.users_aggregate.aggregate.sum.like_count}
        </Box>
      </Typography>
    </Box>
  );
}
