import React from "react";
import { Comment, Post } from "../types";
import {
  Box,
  Divider,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AvatarNameDate from "./AvatarNameDate";
import ButtonUnlikeComment from "./ButtonUnlikeComment";
import ButtonLikeComment from "./ButtonLikeComment";
import sub1 from "../assets/images/subdirectory24Px.png";
import sub2 from "../assets/images/subdirectory24Px@2x.png";
import sub3 from "../assets/images/subdirectory24Px@3x.png";
import CommentEdit from "./CommentEdit";
import useCommentDelete from "./useCommentDelete";
import Linkify from "./Linkify";
import useCommentLiked from "../store/useCommentLiked";
import { useCurrentUser, useRole } from "../store/useGlobalState";
import { getAttitude } from "../helpers/attitude";
import useCommentAttitude from "../store/useCommentAttitude";
const useStyles = makeStyles((theme) => ({
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
export default function Comment2({
  comment: c,
  post,
  setRe,
}: {
  comment: Comment;
  setRe: (user?: string) => void;
  post: Post;
}) {
  const classes = useStyles();
  const [liked] = useCommentLiked(c);
  const [authorLiked] = useCommentAttitude(c);
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
        <div className={classes.flexmiddle}>
          <div>
            <AvatarNameDate
              user_id={c.created_by}
              created_at={c?.updated_at}
              justify="flex-start"
            />
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
        </Box>
      </Box>
      <Divider light />
    </Box>
  );
}
