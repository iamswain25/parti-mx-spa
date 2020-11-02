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
import EventComment from "./EventComment";
import HtmlOrBody from "./HtmlOrBody";
import ShareButtons from "./ShareButtons";
const useStyles = makeStyles((theme) => {
  return {
    root: {
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
  const { images, createdBy, created_at, files, metadata } = p as Event;
  const liked = p.meLiked?.[0]?.like_count ?? 0;
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <Box pt={2}>
      <Box paddingX={2} className={classes.root}>
        <Box color="grey.900" className={classes.title}>
          {p.title}
          <Box display="flex" alignItems="center">
            <ShareButtons post={p} />
            <PostMenu post={p} />
          </Box>
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
        <HtmlOrBody post={p} />
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
      <div className={classes.root}>
        <EventComment post={p} />
      </div>
    </Box>
  );
}
