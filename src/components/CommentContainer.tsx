import React from "react";
import { Comment } from "../types";
import { Box, Divider } from "@material-ui/core";
import Comment1 from "./Comment1";
import CommentTextinput from "./CommentTextinput";

export default function CommentContainer({
  comments,
  post_id,
}: {
  comments?: Comment[];
  post_id?: number;
}) {
  return (
    <>
      <Box padding={2}>
        <Box
          fontSize={14}
          letterSpacing={-0.39}
          color="text.primary"
          display="flex"
        >
          댓글
          <Box ml={0.5} color="primary.dark">
            20
          </Box>
        </Box>
        <Box pb={1}>
          <CommentTextinput post_id={post_id} />
        </Box>
        <Divider light />
        {comments?.map((c, i) => {
          return <Comment1 key={i} comment={c} />;
        })}
      </Box>
    </>
  );
}
