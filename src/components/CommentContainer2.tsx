import React from "react";
import { Comment, Post } from "../types";
import {
  Box,
  Divider,
  makeStyles,
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";
import Comment1 from "./Comment1";
import CommentTextinput from "./CommentTextinput";
import useCommentInsert from "./useCommentInsert";
import useComments from "../store/useComments";
import usePostCounter from "../store/usePostCounter";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import LikedUsers from "./LikedUsers";
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
    flexcenter: {
      display: "flex",
      justifyContent: "center",
      margin: theme.spacing(1),
    },
  };
});

export default function CommentContainer2({
  post: p,
  commentLabel = "댓글",
  likeLabel = "응원 인원",
}: {
  post: Post;
  commentLabel?: string;
  likeLabel?: string;
}) {
  const [counter] = usePostCounter(p.id, true);
  const { count_comment = 0, count_like = 0 } = counter || {};
  const [comments, loadmore, loading, hasMore] = useComments({ post_id: p.id });
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
            {commentLabel}
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
            {likeLabel}
            <Box ml={0.5} className="count">
              {count_like}
            </Box>
          </Button>
        </Grid>
        <Box display={isCommentVisible ? undefined : "none"}>
          <Box pb={1}>
            <CommentTextinput
              comment={{ post_id: p.id, body: "" } as Comment}
              handler={insertHandler}
            />
          </Box>
          <Divider light />
          {hasMore && (
            <div className={classes.flexcenter}>
              <Button variant="outlined" onClick={loadmore}>
                더보기
                <ExpandLessIcon />
              </Button>
            </div>
          )}
          {loading && <LinearProgress />}
          {comments?.map((c) => {
            return <Comment1 key={c.id} comment={c} post={p} />;
          })}
        </Box>
        {!isCommentVisible && <LikedUsers post={p} />}
      </Box>
    </>
  );
}
