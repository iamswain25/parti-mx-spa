import React from "react";
import { Comment } from "../types";
import { Box, Divider, makeStyles } from "@material-ui/core";
import Comment1 from "./Comment1";
import CommentTextinput from "./CommentTextinput";
import useCommentInsert from "./useCommentInsert";
let prevCommentCount: number | null = null;
let shouldScroll = false;
const useStyles = makeStyles((theme) => {
  return {
    text: {
      [theme.breakpoints.up("md")]: {
        fontSize: 16,
        letterSpacing: -0.44,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
        letterSpacing: -0.39,
        padding: theme.spacing(2),
      },
    },
  };
});

export default function CommentContainer({
  comments,
  post_id,
  count = 0,
}: {
  comments: Comment[];
  post_id: number;
  count: number;
}) {
  const comment = { post: { id: post_id } } as Comment;
  const classes = useStyles();
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
      <Box className={classes.text}>
        <Box color="text.primary" display="flex">
          댓글
          <Box ml={0.5} color="primary.dark">
            {count}
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
