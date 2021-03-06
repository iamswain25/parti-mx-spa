import React from "react";
import { Comment, User } from "../types";
import { Box, Divider, Grid, Button, Typography } from "@material-ui/core";
import AvatarNameDate from "./AvatarNameDate";
import CommentTextinput from "./CommentTextinput";
import Comment2 from "./Comment2";
import useCommentInsert from "./useCommentInsert";
import ButtonLikeComment from "./ButtonLikeComment";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import { useStyles } from "../helpers/styles";
import { getAttitude } from "../helpers/attitude";
import CommentEdit from "./CommentEdit";
import { useStore } from "../store/store";
import useCommentDelete from "./useCommentDelete";
import Linkify from "./Linkify";
export default function Comment1({ comment: c }: { comment: Comment }) {
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const [isRe, setRe] = React.useState<User | undefined>(undefined);
  const insertHandler = useCommentInsert(() => setRe(undefined));
  const [edit, setEdit] = React.useState<boolean>(false);
  const remove = useCommentDelete(c.id);
  const isMine = c?.user?.id === user_id;
  return (
    <>
      <Box pt={2}>
        <Grid container alignItems="center" justify="space-between">
          <AvatarNameDate
            name={c?.user?.name}
            photo_url={c?.user?.photo_url}
            created_at={c?.updated_at}
            justify="flex-start"
          />
        </Grid>
        <Box ml={4} pt={1} className={classes.text} color="grey.900">
          <Typography color="primary">{getAttitude(c)}</Typography>
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
              <Button className={classes.button} onClick={() => setRe(c?.user)}>
                댓글달기
              </Button>
              {c?.my_like ? (
                <ButtonUnlikeComment
                  id={c?.id}
                  count={c?.likes_aggregate?.aggregate?.count}
                />
              ) : (
                <ButtonLikeComment
                  id={c?.id}
                  count={c?.likes_aggregate?.aggregate?.count}
                />
              )}
              {isMine && (
                <>
                  <Button
                    className={classes.button}
                    onClick={() => setEdit(true)}
                  >
                    수정
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={remove}
                    color="secondary"
                  >
                    삭제
                  </Button>
                </>
              )}
            </div>
          </Box>
          {(c?.re?.length || 0) > 0 && (
            <Box mt={1}>
              <Divider light />
            </Box>
          )}
          {c?.re?.map((c, i) => {
            return <Comment2 key={i} comment={c} setRe={setRe} />;
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
      {c?.re?.length === 0 && (
        <Box mt={1}>
          <Divider light />
        </Box>
      )}
    </>
  );
}
