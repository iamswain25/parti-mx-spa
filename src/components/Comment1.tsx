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
import useCommentDelete from "./useCommentDelete";
import Linkify from "./Linkify";
import { useCurrentUser } from "../store/useGlobalState";
import useCommentLiked from "../store/useCommentLiked";
export default function Comment1({ comment: c }: { comment: Comment }) {
  const [liked] = useCommentLiked({ comment_id: c.id, post_id: c.post_id });
  const [currentUser] = useCurrentUser();
  const userId = currentUser?.uid;
  const classes = useStyles();
  const [isRe, setRe] = React.useState<string | undefined>(undefined);
  const insertHandler = useCommentInsert(() => setRe(undefined));
  const [edit, setEdit] = React.useState<boolean>(false);
  const remove = useCommentDelete(c.id);
  const isMine = c.created_by === userId;
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
          {/* <Typography color="primary">{getAttitude(c)}</Typography> */}
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
                <ButtonUnlikeComment id={c?.id} count={c?.count_like} />
              ) : (
                <ButtonLikeComment id={c?.id} count={c?.count_like} />
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
          {/* {(c?.re?.length || 0) > 0 && (
            <Box mt={1}>
              <Divider light />
            </Box>
          )} */}
          {/* {c?.re?.map((c, i) => {
            return <Comment2 key={i} comment={c} setRe={setRe} />;
          })} */}
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
