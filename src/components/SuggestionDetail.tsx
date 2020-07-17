import React from "react";
import { Post } from "../types";
import { Box, Grid, Divider, makeStyles, Avatar } from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import CommentContainer from "./CommentContainer";
import BtnUnlikePost from "./BtnUnlikePost";
import LinkPreview from "./LinkPreview";
import Linkify from "react-linkify";
import ImageCarousel from "./ImageCarousel";
import useDesktop from "./useDesktop";
import { semanticDate } from "../helpers/datefns";
const useStyles = makeStyles((theme) => {
  const colors = {
    emerald: theme.palette.primary.dark,
    grey900: theme.palette.grey[900],
  };
  return {
    root: {
      color: colors.grey900,
      [theme.breakpoints.up("md")]: {
        maxWidth: 900,
        paddingLeft: 60,
        paddingRight: 60,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.palette.grey[300],
      },
    },
    title: {
      [theme.breakpoints.up("md")]: {
        paddingTop: 60,
        fontSize: 24,
        letterSpacing: -0.6,
        paddingBottom: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        fontWeight: 500,
      },
    },
    image: {
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
    body: {
      [theme.breakpoints.up("md")]: {
        fontSize: 16,
        letterSpacing: -0.4,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
        letterSpacing: -0.3,
        marginTop: theme.spacing(1.5),
      },
    },
    small: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
    },
    label: {
      fontSize: 12,
      fontWeight: 500,
      color: colors.emerald,
      marginRight: theme.spacing(0.5),
    },
  };
});

export default function SuggestionDetail({ post: p }: { post?: Post }) {
  const { body, images, comments, createdBy, created_at } = p ?? { images: [] };
  const commentCount = p?.comments_aggregate?.aggregate?.count || 0;
  const liked = p?.meLiked?.[0]?.like_count ?? 0;
  const likeCount = p?.users_aggregate?.aggregate?.sum?.like_count || 0;
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <Box bgcolor="grey.100">
      <Box paddingX={2} className={classes.root}>
        <Box className={classes.title}>{p?.title}</Box>
        <Box my={2}>
          <Divider light />
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center">
            <Box className={classes.label}>제안자</Box>
            <Avatar
              alt={createdBy?.name}
              src={createdBy?.photo_url}
              className={classes.small}
            />
            <Box ml={1} fontWeight={500}>
              {createdBy?.name}
            </Box>
          </Grid>
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center" justify="space-between">
            <Box display="flex">
              <Box className={classes.label}>제안일</Box>
              <Box>{semanticDate(created_at)}</Box>
            </Box>
          </Grid>
        </Box>
        <Box className={classes.image}>
          <ImageCarousel images={images} />
        </Box>
        <Box className={classes.body}>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={decoratedHref}
                key={key}
              >
                {decoratedText}
              </a>
            )}
          >
            {body}
          </Linkify>
        </Box>
        <LinkPreview text={body} />
        <Box mt={4} mb={isDesktop ? 5 : 2}>
          <Grid container justify="center" alignItems="center">
            {liked ? (
              <BtnUnlikePost id={p?.id} count={likeCount} />
            ) : (
              <BtnLikePost id={p?.id} count={likeCount} />
            )}
          </Grid>
        </Box>
      </Box>
      {!isDesktop && <GreyDivider height={0.5} />}
      <Box className={classes.root}>
        <CommentContainer
          comments={comments}
          post_id={p?.id}
          count={commentCount}
        />
      </Box>
    </Box>
  );
}
