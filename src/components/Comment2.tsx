import React from "react";
import { Comment, User } from "../types";
import { Box, Divider, Grid, Button, Typography } from "@material-ui/core";
import AvatarNameDate from "./AvatarNameDate";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import ButtonLikeComment from "./ButtonLikeComment";
import { useStyles } from "../helpers/styles";
import sub1 from "../assets/images/subdirectory24Px.png";
import sub2 from "../assets/images/subdirectory24Px@2x.png";
import sub3 from "../assets/images/subdirectory24Px@3x.png";
import { getAttitude } from "../helpers/attitude";
import CommentEdit from "./CommentEdit";
import useCommentDelete from "./useCommentDelete";
import Linkify from "./Linkify";
import useMe from "../store/useMe";

export default function Comment2({
  comment: c,
  setRe,
}: {
  comment: Comment;
  setRe: (user?: User) => void;
}) {
  const classes = useStyles();
  const [me] = useMe();
  const [edit, setEdit] = React.useState<boolean>(false);
  const remove = useCommentDelete(c.id);
  const isMine = c.created_by === me?.id;
  return (
    <Box position="relative">
      <Box position="absolute" left={-16} top={16}>
        <img srcSet={`${sub1}, ${sub2} 2x, ${sub3} 3x`} src={sub3} />
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
        </Box>
      </Box>
      <Divider light />
    </Box>
  );
}
