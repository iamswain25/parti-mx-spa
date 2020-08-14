import React from "react";
import { Comment, User } from "../types";
import { Box, Divider, Grid, Button, Typography } from "@material-ui/core";
import AvatarNameDate from "./AvatarNameDate";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import ButtonLikeComment from "./ButtonLikeComment";
import { useStyles } from "../helpers/styles";
import { Img } from "react-image";
import sub1 from "../assets/images/subdirectory24Px.png";
import sub2 from "../assets/images/subdirectory24Px@2x.png";
import sub3 from "../assets/images/subdirectory24Px@3x.png";
import { getAttitude } from "../helpers/attitude";
import CommentEdit from "./CommentEdit";
import useCommentDelete from "./useCommentDelete";
import { useStore } from "../store/store";

export default function Comment2({
  comment: c,
  setRe,
}: {
  comment: Comment;
  setRe: (user?: User) => void;
}) {
  const classes = useStyles();
  const [{ user_id }] = useStore();
  const [edit, setEdit] = React.useState<boolean>(false);
  const remove = useCommentDelete(c.id);
  const isMine = c?.user?.id === user_id;
  return (
    <Box position="relative">
      <Box position="absolute" left={-16} top={16}>
        <Img srcSet={`${sub1}, ${sub2} 2x, ${sub3} 3x`} src={sub3} />
      </Box>
      <Box paddingY={2}>
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
            <Typography>
              {c?.body || (
                <Typography color="textSecondary">삭제되었습니다.</Typography>
              )}
            </Typography>
          )}
          <Box color="grey.600" display="flex" mt={1}>
            <div className={classes.buttons}>
              <Button className={classes.button} onClick={() => setRe(c?.user)}>
                Reply
              </Button>
              {c?.likes?.[0] ? (
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
        </Box>
      </Box>
      <Divider light />
    </Box>
  );
}
