import React from "react";
import { Post } from "../types";
import { semanticDate } from "../helpers/datefns";
import { Typography, Box } from "@material-ui/core";
import useCounter from "../store/useCounter";
export default function BoardPostSub2({ post: p }: { post: Post }) {
  const [counter] = useCounter(p.id);
  const { count_comment = 0, count_like = 0 } = counter || {};
  const isVote = p.type === "vote";
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
          댓글 {count_comment}
        </Box>
        <Box component="span" mr={1}>
          {isVote ? `참여자 ${count_like}명` : `공감 ${count_like}`}
        </Box>
      </Typography>
    </Box>
  );
}
