import React from "react";
import { Post } from "../types";
import { semanticDate } from "../helpers/datefns";
import { Typography, Box } from "@material-ui/core";
import useUser from "../store/useUser";
import useDesktop from "./useDesktop";
export default function BoardPostSub2({ post: p }: { post: Post }) {
  const [user] = useUser({ id: p.created_by });
  const { count_comment = 0, count_like = 0 } = p;
  const isVote = p.type === "vote";
  const [isDesktop] = useDesktop();
  return (
    <Box color="grey.600">
      <Typography variant="body2">
        <Box component="span" mr={1}>
          {user?.name || "익명"}
        </Box>
        <Box component="span" mr={1}>
          {semanticDate(p.created_at)}
        </Box>
        <Box component="span" mr={1}>
          {isDesktop ? `조회 ${p.count_view || 0}` : p.count_view || 0}
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
