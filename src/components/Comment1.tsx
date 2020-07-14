import React from "react";
import { Comment, User } from "../types";
import {
  Box,
  Divider,
  Grid,
  Button,
  Theme,
  makeStyles,
} from "@material-ui/core";
import AvatarNameDate from "./AvatarNameDate";
import CommentTextinput from "./CommentTextinput";
import Comment2 from "./Comment2";
import useCommentInsert from "./useCommentInsert";
import ButtonLikeComment from "./ButtonLikeComment";
import ButtonUnlikeComment from "./ButtonUnlikeComment";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    color: "inherit",
  },
}));
export default function Comment1({ comment: c }: { comment?: Comment }) {
  const classes = useStyles();
  const [isRe, setRe] = React.useState<User | undefined>(undefined);
  const insertHandler = useCommentInsert(() => setRe(undefined));

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
        <Box ml={4} pt={1} fontSize={12} letterSpacing={-0.26} color="grey.900">
          {c?.body}
          <Box fontSize={11} color="grey.600" display="flex" mt={1}>
            <Button className={classes.button} onClick={() => setRe(c?.user)}>
              댓글달기
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
