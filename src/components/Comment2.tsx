import React from "react";
import { Comment } from "../types";
import { Box, Divider, Grid, Button, Typography } from "@material-ui/core";
import AvatarNameDate from "./AvatarNameDate";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import ButtonLikeComment from "./ButtonLikeComment";
import { useStyles } from "../helpers/styles";
import sub1 from "../assets/images/subdirectory24Px.png";
import sub2 from "../assets/images/subdirectory24Px@2x.png";
import sub3 from "../assets/images/subdirectory24Px@3x.png";
import CommentEdit from "./CommentEdit";
import useCommentDelete from "./useCommentDelete";
import Linkify from "./Linkify";
import useCommentLiked from "../store/useCommentLiked";
import { useCurrentUser, useRole } from "../store/useGlobalState";
export default function Comment2({
  comment: c,
  setRe,
}: {
  comment: Comment;
  setRe: (user?: string) => void;
}) {
  const classes = useStyles();
  const [liked] = useCommentLiked(c);
  const [currentUser] = useCurrentUser();
  const [edit, setEdit] = React.useState<boolean>(false);
  const [role] = useRole();
  const remove = useCommentDelete(c);
  function editHandler() {
    setEdit(true);
  }
  return (
    <Box position="relative">
      <Box position="absolute" left={-16} top={16}>
        <img
          srcSet={`${sub1}, ${sub2} 2x, ${sub3} 3x`}
          src={sub3}
          alt="comment"
        />
      </Box>
      <Box paddingY={2}>
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
        </Box>
      </Box>
      <Divider light />
    </Box>
  );
}
