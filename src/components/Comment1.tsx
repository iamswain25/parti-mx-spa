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
export default function Comment1({
  comment: c,
  post,
}: {
  comment: Comment;
  post: Post;
}) {
  const [liked] = useCommentLiked(c);
  const [comments2] = useComments2(c);
  const classes = useStyles();
  const [isRe, setRe] = React.useState<string | undefined>(undefined);
  const insertHandler = useCommentInsert({
    post,
    callback: () => setRe(undefined),
  });
  const [edit, setEdit] = React.useState<boolean>(false);
  const remove = useCommentDelete(c);
  function editHandler() {
    const input = window.prompt("비밀번호를 입력하세요");
    if (input === c.password) {
      setEdit(true);
    } else {
      window.alert("비밀번호가 맞지 않습니다.");
    }
  }
  return (
    <>
      <Box pt={2}>
        <Grid container alignItems="center" justify="space-between">
          <AvatarNameDate
            name={c?.name}
            photo_url={undefined}
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
              <Button className={classes.button} onClick={editHandler}>
                수정
              </Button>
              <Button
                className={classes.button}
                onClick={remove}
                color="secondary"
              >
                삭제
              </Button>
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
      {c?.count_comment === 0 && (
        <Box mt={1}>
          <Divider light />
        </Box>
      )}
    </>
  );
}
