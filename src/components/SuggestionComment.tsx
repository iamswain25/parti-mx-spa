import React from "react";
import { Comment, Post } from "../types";
import { Box, Divider, makeStyles, Grid, Button } from "@material-ui/core";
import Comment1 from "./Comment1";
import CommentTextinput from "./CommentTextinput";
import useCommentInsert from "./useCommentInsert";
import AvatarNameDate2 from "./AvatarNameDate2";
import useComments from "../store/useComments";
import usePostLikedUsers from "../store/usePostLikedUsers";
import usePostCounter from "../store/usePostCounter";
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
    btn: {
      padding: theme.spacing(0),
      color: theme.palette.text.disabled,
      "&.active": {
        color: theme.palette.text.primary,
        "& .count": {
          color: theme.palette.primary.dark,
        },
      },
    },
  };
});

export default function SuggestionComment({ post: p }: { post: Post }) {
  const [counter] = usePostCounter(p.id, true);
  const { count_comment = 0, count_like = 0 } = counter || {};
  const [comments] = useComments(p.id);
  const [likedUsers] = usePostLikedUsers(p.id);
  const [isCommentVisible, setCommentVisible] = React.useState(true);
  const classes = useStyles();
  const insertHandler = useCommentInsert({
    post: p,
    callback: () => {
      window.scrollTo(0, document.body.scrollHeight - 300);
    },
  });
  return (
    <>
      <Box className={classes.text}>
        <Grid container alignItems="center">
          <Button
            className={`${classes.btn} ${isCommentVisible ? "active" : ""}`}
            onClick={() => setCommentVisible(true)}
          >
            댓글
            <Box ml={0.5} className="count">
              {count_comment}
            </Box>
          </Button>
          <Box mx={1} height={14}>
            <Divider orientation="vertical" />
          </Box>
          <Button
            className={`${classes.btn} ${isCommentVisible ? "" : "active"}`}
            onClick={() => setCommentVisible(false)}
          >
            응원 인원
            <Box ml={0.5} className="count">
              {count_like}
            </Box>
          </Button>
        </Grid>
        {isCommentVisible ? (
          <Box>
            <Box pb={1}>
              <CommentTextinput
                comment={{ post_id: p.id, body: "" } as Comment}
                handler={insertHandler}
              />
            </Box>
            <Divider light />
            {comments?.map((c, i) => {
              return <Comment1 key={i} comment={c} post={p} />;
            })}
          </Box>
        ) : (
          <Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Grid container wrap="wrap" spacing={2}>
              {likedUsers?.map((u) => (
                <AvatarNameDate2 key={u.id} postLike={u} />
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}
