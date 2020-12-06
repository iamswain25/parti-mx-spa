import React from "react";
import { Post, VoteMetadata } from "../types";
import {
  Box,
  Grid,
  Divider,
  makeStyles,
  Typography,
  Hidden,
} from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import CommentContainer from "./CommentContainer";
import AvatarNameDate from "./AvatarNameDate";
import useDesktop from "./useDesktop";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import { daysLeftMeta } from "../helpers/datefns";
import PostMenu from "./PostMenu";
import FilesImages from "./FilesImages";
import ShareButtons from "./ShareButtons";
import HtmlOrBody from "./HtmlOrBody";
import useComments from "../store/useComments";
import HashtagsDetail from "./HashtagsDetail";
import CandidatesDetail from "./CandidatesDetail";
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
      whiteSpace: "pre-wrap",
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
    icon: {
      width: 15,
      height: 17,
      marginRight: theme.spacing(0.5),
    },
    vote: {
      marginBottom: theme.spacing(2),
    },
  };
});

export default function VoteDetail({ post: p }: { post: Post<VoteMetadata> }) {
  const {
    images,
    created_at,
    files,
    closed_at,
    metadata,
    count_comment = 0,
  } = p;
  const [comments] = useComments({ post_id: p.id });
  const isClosed = !!closed_at;
  const daysLeft = React.useMemo(() => daysLeftMeta(metadata, created_at), [
    metadata,
    created_at,
  ]);
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <Box pt={2}>
      <Box paddingX={2} className={classes.root}>
        <Box color="grey.900" className={classes.title}>
          {p.title}
          <Hidden smDown implementation="css">
            <Box display="flex" alignItems="center">
              <ShareButtons post={p} />
              <PostMenu post={p} />
            </Box>
          </Hidden>
        </Box>
        <Box mt={1}>
          <AvatarNameDate user_id={p.created_by} created_at={created_at} />
        </Box>
        <Box my={2}>
          <Divider light />
        </Box>
        {!isClosed && (
          <Grid container alignItems="center" className={classes.vote}>
            <HowToVoteIcon color="primary" className={classes.icon} />
            <Box color="primary.dark" fontWeight={500}>
              <Typography variant="body1">{daysLeft}</Typography>
            </Box>
          </Grid>
        )}
        <FilesImages images={images} files={files} />
        <HtmlOrBody post={p} />
        <HashtagsDetail tags={p.tags} />
        <CandidatesDetail post={p} />
      </Box>
      {!isDesktop && <GreyDivider height={0.5} />}
      <div className={classes.root}>
        <CommentContainer comments={comments} post={p} count={count_comment} />
      </div>
    </Box>
  );
}
