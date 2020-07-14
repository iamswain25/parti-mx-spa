import React from "react";
import { Post } from "../types";
import { Box, Grid, Divider } from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import CommentContainer from "./CommentContainer";
import AvatarNameDate from "./AvatarNameDate";
import BtnUnlikePost from "./BtnUnlikePost";
import LinkPreview from "./LinkPreview";
import Linkify from "react-linkify";
import ImageCarousel from "./ImageCarousel";

export default function SuggestionDetail({ post: p }: { post?: Post }) {
  const { body, images, comments, createdBy, created_at } = p ?? {};
  const commentCount = p?.comments_aggregate?.aggregate?.count || 0;
  const liked = p?.meLiked?.[0]?.like_count ?? 0;
  const likeCount = p?.users_aggregate?.aggregate?.sum?.like_count || 0;
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
        <ImageCarousel images={images} />
        <Box fontSize={14} letterSpacing={-0.3} color="grey.900" mt={1.5}>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key}>
                {decoratedText}
              </a>
            )}
          >
            {body}
          </Linkify>
        </Box>
        <LinkPreview text={body} />
        <Box mt={4} mb={2}>
          <Grid container justify="center" alignItems="center">
            {liked ? (
              <BtnUnlikePost id={p?.id} count={likeCount} />
            ) : (
              <BtnLikePost id={p?.id} count={likeCount} />
            )}
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
