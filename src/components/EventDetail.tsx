import React from "react";
import { Post, Event } from "../types";
import { Box, Grid, Divider, makeStyles, Typography } from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import AvatarNameDate from "./AvatarNameDate";
import BtnUnlikePost from "./BtnUnlikePost";
import useDesktop from "./useDesktop";
import PostMenu from "./PostMenu";
import FilesImages from "./FilesImages";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import EventMetadataInfo from "./EventMetadataInfo";
import GoogleCanlendarAdd from "./GoogleCanlendarAdd";
import CommentContainer2 from "./CommentContainer2";
import HtmlOrBody from "./HtmlOrBody";
import usePostLiked from "../store/usePostLiked";
import TagsDetail from "./TagsDetail";
const useStyles = makeStyles(theme => {
  return {
    root: {
      paddingTop: theme.spacing(2),
      flex: 1,
      [theme.breakpoints.up("md")]: {
        maxWidth: 900,
        paddingLeft: 60,
        paddingRight: 60,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: theme.palette.background.paper,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.palette.grey[300],
      },
    },
    title: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.up("md")]: {
        paddingTop: 60,
        fontSize: 24,
        letterSpacing: -0.6,
        paddingBottom: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        paddingBottom: theme.spacing(1),
        fontSize: 16,
        fontWeight: 500,
      },
    },
  };
});

export default function EventDetail({ post: p }: { post: Post }) {
  const { images, created_at, files, metadata } = p as Event;
  const [liked] = usePostLiked(p.id);
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <section className={classes.root}>
      <Box paddingX={2}>
        <Box color="grey.900" className={classes.title}>
          {p.title}
          <Box display="flex" alignItems="center">
            <PostMenu post={p} />
          </Box>
        </Box>
        <Box mb={2} mt={1}>
          <AvatarNameDate
            user_id={p.created_by}
            created_at={created_at}
            count_view={p.count_view || 0}
          />
        </Box>
        <Divider light />
        {p.is_closed ? null : (
          <Box my={2}>
            <Typography variant="body1" color="primary">
              <HourglassEmptyIcon /> 모집중
            </Typography>
          </Box>
        )}
        <FilesImages images={images} files={files} />
        <HtmlOrBody post={p} />
        <TagsDetail post={p} />
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
      <div>
        <CommentContainer2 post={p} likeLabel="공감 인원" />
      </div>
    </section>
  );
}
