import React from "react";
import { Comment, Post } from "../types";
import {
  Box,
  Divider,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AvatarNameDate from "./AvatarNameDate";
import CommentTextinput from "./CommentTextinput";
import Comment2 from "./Comment2";
import useCommentInsert from "./useCommentInsert";
import ButtonLikeComment from "./ButtonLikeComment";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import CommentEdit from "./CommentEdit";
import useCommentDelete from "./useCommentDelete";
import Linkify from "./Linkify";
import useCommentLiked from "../store/useCommentLiked";
import useComments2 from "../store/useComments2";
import { useCurrentUser, useRole } from "../store/useGlobalState";
import useCommentAttitude from "../store/useCommentAttitude";
import { getAttitude } from "../helpers/attitude";
import AvatarNameDateObject from "./AvatarNameDateObject";
const useStyles = makeStyles(theme => ({
  attitude: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
  },
  buttons: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: theme.spacing(1) + "px",
    [theme.breakpoints.up("md")]: {
      fontSize: 12,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  text: {
    [theme.breakpoints.up("md")]: {
      fontSize: 14,
      letterSpacing: -0.3,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      letterSpacing: -0.26,
    },
  },
  flexmiddle: {
    display: "flex",
    alignItems: "center",
  },
}));
export default function Comment1({
  comment: c,
  post,
}: {
  comment: Comment;
  post: Post;
}) {
  const [liked] = useCommentLiked(c);
  const [currentUser] = useCurrentUser();
  const [authorLiked] = useCommentAttitude(c);
  const [comments2] = useComments2(c);
  const count_comment = comments2?.length || 0;
  const classes = useStyles();
  const [isRe, setRe] = React.useState<string | undefined>(undefined);
  const [isDeleted, setDeleted] = React.useState<boolean>(false);
  const insertHandler = useCommentInsert({
    post,
    callback: () => setRe(undefined),
  });
  const [edit, setEdit] = React.useState<boolean>(false);
  const [role] = useRole();
  const remove = useCommentDelete(c, () => {
    setDeleted(true);
  });
  function editHandler() {
    setEdit(true);
  }
  if (isDeleted) {
    return null;
  }
  return (
    <>
      <Box pt={2}>
        <div className={classes.flexmiddle}>
          <div>
            {typeof c.created_by === "string" ? (
              <AvatarNameDate
                user_id={c.created_by}
                created_at={c.created_at}
                justify="flex-start"
              />
            ) : (
              <AvatarNameDateObject
                user={c.created_by}
                created_at={c.created_at}
                justify="flex-start"
              />
            )}
          </div>
          <div className={classes.attitude}>
            {authorLiked && getAttitude(post)}
          </div>
        </div>
        <Box ml={4} pt={1} className={classes.text} color="grey.900">
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
          {count_comment > 0 && (
            <Box mt={1}>
              <Divider light />
            </Box>
          )}
          {comments2.map(c => {
            return (
              <Comment2 key={c.id} comment={c} setRe={setRe} post={post} />
            );
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
