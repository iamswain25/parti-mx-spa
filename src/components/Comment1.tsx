import React from "react";
import { Comment } from "../types";
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
  const [isRe, setRe] = React.useState<string | undefined>(undefined);
  function setReAt(name?: string) {
    if (name) {
      setRe(`@${name} `);
    } else {
      setRe(`@${c?.user?.name} `);
    }
  }
  return (
    <>
      <Box paddingY={2}>
        <Grid container alignItems="center" justify="space-between">
          <AvatarNameDate
            name={c?.user?.name}
            photo_url={c?.user?.photo_url}
            created_at={c?.updated_at}
            justify="flex-start"
          />
        </Grid>
        <Box
          ml={4}
          paddingY={1}
          fontSize={12}
          letterSpacing={-0.26}
          color="grey.900"
        >
          {c?.body}
          <Box fontSize={11} color="grey.600" display="flex" mt={1}>
            <Button
              className={classes.button}
              onClick={() => setReAt(c?.user?.name)}
            >
              댓글달기
            </Button>
            <Box ml={1}>
              <Button className={classes.button}>공감</Button>
            </Box>
            <Box ml={0.5} alignItems="center" display="flex">
              {c?.likes_aggregate?.aggregate?.count}
            </Box>
          </Box>
          {c?.re?.map((c, i) => {
            return <Comment2 key={i} comment={c} setReAt={setReAt} />;
          })}
          {isRe && (
            <CommentTextinput
              post_id={c?.post?.id}
              comment_id={isRe ? c?.id : null}
              body={isRe}
              autoFocus
            />
          )}
        </Box>
      </Box>
      <Divider light />
    </>
  );
}
