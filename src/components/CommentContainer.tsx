import React from "react";
import { Comment } from "../types";
import { Box, Divider } from "@material-ui/core";
import Comment1 from "./Comment1";
import CommentTextinput from "./CommentTextinput";
import useCommentInsert from "./useCommentInsert";
let prevCommentCount: number | null = null;
let shouldScroll = false;
export default function CommentContainer({
  comments,
  post_id,
  count = 0,
}: {
  comments?: Comment[];
  post_id?: number;
  count: number;
}) {
  const comment = { post: { id: post_id } } as Comment;
  React.useEffect(() => {
    if (count) {
      if (prevCommentCount && shouldScroll) {
        window.scrollTo(0, document.body.scrollHeight);
        shouldScroll = false;
      }
      prevCommentCount = count;
    }
  }, [count]);
  const insertHandler = useCommentInsert(() => (shouldScroll = true));
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
          <CommentTextinput comment={comment} handler={insertHandler} />
        </Box>
        <Divider light />
        {comments?.map((c, i) => {
          return <Comment1 key={i} comment={c} />;
        })}
      </Box>
    </>
  );
}
