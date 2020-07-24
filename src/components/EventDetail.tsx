import React from "react";
import { Post, Event } from "../types";
import {
  Box,
  Grid,
  Divider,
  makeStyles,
  Hidden,
  Typography,
} from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import CommentContainer from "./CommentContainer";
import AvatarNameDate from "./AvatarNameDate";
import BtnUnlikePost from "./BtnUnlikePost";
import LinkPreview from "./LinkPreview";
import Linkify from "react-linkify";
import useDesktop from "./useDesktop";
import PostMenu from "./PostMenu";
import FilesImages from "./FilesImages";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import EventMetadataInfo from "./EventMetadataInfo";
import GoogleCanlendarAdd from "./GoogleCanlendarAdd";
const useStyles = makeStyles((theme) => {
  return {
    root: {
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
  };
});

export default function EventDetail({ post: p }: { post: Post }) {
  const {
    body,
    images,
    comments,
    createdBy,
    created_at,
    files,
    metadata,
  } = p as Event;
  const commentCount = p.comments_aggregate?.aggregate?.count || 0;
  const liked = p.meLiked?.[0]?.like_count ?? 0;
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <Box bgcolor="grey.100">
      <Box paddingX={2} className={classes.root}>
        <Box color="grey.900" className={classes.title}>
          {p.title}
          <Hidden smDown>
            <PostMenu post={p} />
          </Hidden>
        </Box>
        <Box mb={2} mt={1}>
          <AvatarNameDate
            name={createdBy?.name}
            photo_url={createdBy?.photo_url}
            created_at={created_at}
          />
        </Box>
        <Divider light />
        <Box my={2}>
          <Typography variant="body1" color="primary">
            <HourglassEmptyIcon /> 모집중
          </Typography>
        </Box>
        <FilesImages images={images} files={files} />
        <Box className={classes.body} color="grey.900">
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
        <Box my={2}>
          <Divider />
        </Box>
        <EventMetadataInfo metadata={metadata} />
        <Box mt={4} mb={isDesktop ? 5 : 2}>
          <Grid container justify="center" alignItems="center">
            {liked ? <BtnUnlikePost post={p} /> : <BtnLikePost post={p} />}
          </Grid>
          <GoogleCanlendarAdd post={p} />
        </Box>
      </Box>
      {!isDesktop && <GreyDivider height={0.5} />}
      <Box className={classes.root}>
        <CommentContainer
          comments={comments}
          post_id={p.id}
          count={commentCount}
        />
      </Box>
    </Box>
  );
}