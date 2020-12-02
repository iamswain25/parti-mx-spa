import React from "react";
import { Comment, Post } from "../types";
import { Box, Divider, Grid, Button, Typography } from "@material-ui/core";
import AvatarNameDate from "./AvatarNameDate";
import CommentTextinput from "./CommentTextinput";
import Comment2 from "./Comment2";
import useCommentInsert from "./useCommentInsert";
import ButtonLikeComment from "./ButtonLikeComment";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import { useStyles } from "../helpers/styles";
import CommentEdit from "./CommentEdit";
import useCommentDelete from "./useCommentDelete";
import Linkify from "./Linkify";
import useCommentLiked from "../store/useCommentLiked";
import useComments2 from "../store/useComments2";
import useCommentCounter from "../store/useCommentCounter";
import { useCurrentUser, useRole } from "../store/useGlobalState";
export default function Comment1({
  comment: c,
  post,
}: {
  comment: Comment;
  post: Post;
}) {
  const [liked] = useCommentLiked(c);
  const [currentUser] = useCurrentUser();
  const [counter] = useCommentCounter({ post_id: c.post_id, comment_id: c.id });
  const { count_comment = 0 } = counter || {};
  const [comments2] = useComments2(c);
  const classes = useStyles();
  const [isRe, setRe] = React.useState<string | undefined>(undefined);
  const insertHandler = useCommentInsert({
    post,
    callback: () => setRe(undefined),
  });
  const [edit, setEdit] = React.useState<boolean>(false);
  const [role] = useRole();
  const remove = useCommentDelete(c);
  function editHandler() {
    setEdit(true);
  }
  return (
    <>
      <Box pt={2}>
        <Grid container alignItems="center" justify="space-between">
          <AvatarNameDate
            user_id={c.created_by}
            created_at={c?.updated_at}
            justify="flex-start"
          />
        </Grid>
        <Box ml={4} pt={1} className={classes.text} color="grey.900">
          <Typography color="primary">{c.attitude}</Typography>
          {edit ? (
            <CommentEdit c={c} setEdit={setEdit} />
          ) : (
            <Typography display="block">
              {c?.body ? (
                <Linkify body={c?.body} />
              ) : (
                <Typography color="textSecondary">삭제되었습니다.</Typography>
              )}
            </Typography>
          )}
          <Box color="grey.600" display="flex" mt={1}>
            <div className={classes.buttons}>
              <Button className={classes.button} onClick={() => setRe(c?.name)}>
                댓글달기
              </Button>
              {liked ? (
                <ButtonUnlikeComment comment={c} />
              ) : (
                <ButtonLikeComment comment={c} />
              )}
              {c.created_by === currentUser?.uid && (
                <Button className={classes.button} onClick={editHandler}>
                  수정
                </Button>
              )}
              {(c.created_by === currentUser?.uid || role === "organizer") && (
                <Button
                  className={classes.button}
                  onClick={remove}
                  color="secondary"
                >
                  삭제
                </Button>
              )}
            </div>
          </Box>
          {(comments2?.length || 0) > 0 && (
            <Box mt={1}>
              <Divider light />
            </Box>
          )}
          {comments2.map((c) => {
            return <Comment2 key={c.id} comment={c} setRe={setRe} />;
          })}
          {isRe && (
            <CommentTextinput
              comment={c}
              user={isRe}
              autoFocus
              handler={insertHandler}
            />
          )}
        </Box>
      </Box>
      {count_comment === 0 && (
        <Box mt={1}>
          <Divider light />
        </Box>
      )}
    </>
  );
}
