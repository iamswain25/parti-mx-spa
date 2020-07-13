import React from "react";
import { Post } from "../types";
import { Box, Grid, makeStyles, Divider } from "@material-ui/core";
import BtnLike from "./BtnLike";
import GreyDivider from "./GreyDivider";
import CommentContainer from "./CommentContainer";
import AvatarNameDate from "./AvatarNameDate";
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  img: {
    width: "100%",
    objectFit: "contain",
  },
}));

export default function SuggestionDetail({ post: p }: { post?: Post }) {
  const { body, images, comments, createdBy, created_at } = p ?? {};
  const commentCount = p?.comments_aggregate?.aggregate?.count || 0;
  const classes = useStyles();
  return (
    <>
      <Box paddingX={2} mt={1}>
        <Box mb={2}>
          <AvatarNameDate
            name={createdBy?.name}
            photo_url={createdBy?.photo_url}
            created_at={created_at}
          />
        </Box>
        <Divider light />
        <Box>
          {images?.map((image, i) => (
            <img
              key={i}
              src={image?.uri}
              className={classes.img}
              alt={JSON.stringify(image)}
            />
          ))}
        </Box>
        <Box fontSize={14} letterSpacing={-0.3} color="grey.900" mt={1.5}>
          {body}
        </Box>
        <Box mt={4} mb={2}>
          <Grid container justify="center" alignItems="center">
            <BtnLike count={p?.users_aggregate?.aggregate?.sum?.like_count} />
          </Grid>
        </Box>
      </Box>
      <GreyDivider height={0.5} />

      <CommentContainer
        comments={comments}
        post_id={p?.id}
        count={commentCount}
      />
    </>
  );
}
