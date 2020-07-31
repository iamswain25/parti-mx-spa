import React from "react";
import { Post, VoteMetadata } from "../types";
import {
  Box,
  Grid,
  Divider,
  makeStyles,
  Typography,
  Button,
  Hidden,
} from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import CommentContainer from "./CommentContainer";
import AvatarNameDate from "./AvatarNameDate";
import LinkPreview from "./LinkPreview";
import Linkify from "react-linkify";
import useDesktop from "./useDesktop";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import { daysLeftMeta } from "../helpers/datefns";
import VoteCandidate from "./VoteCandidate";
import useVoteCandidate from "./useVoteCandidate";
import PostMenu from "./PostMenu";
import FilesImages from "./FilesImages";
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
      [theme.breakpoints.up("md")]: {
        paddingTop: 60,
        fontSize: 24,
        letterSpacing: -0.6,
        paddingBottom: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
    sub: {
      letterSpacing: -0.3,
      color: theme.palette.grey[700],
      [theme.breakpoints.up("md")]: {
        fontSize: 13,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 11,
      },
    },
    btn: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.dark,
      borderColor: "#bbe7d6",
    },
  };
});

export default function VoteDetail({ post: p }: { post: Post }) {
  const { body, images, comments, createdBy, created_at = "", files } = p;
  const metadata = p.metadata as VoteMetadata;
  const commentCount = p.comments_aggregate?.aggregate?.count || 0;
  const participantCount = p.users_aggregate?.aggregate?.sum?.like_count;
  const daysLeft = React.useMemo(() => daysLeftMeta(metadata, created_at), [
    metadata,
    created_at,
  ]);
  const classes = useStyles();
  const voteHandler = useVoteCandidate(p);
  const [isVoted, setVoted] = React.useState(false);
  React.useEffect(() => {
    setVoted(!!p.meLiked?.[0]?.like_count);
  }, [p]);
  const [totalVoteCount, maxVoteCount] = React.useMemo(() => {
    return [
      p.candidates?.reduce(
        (p, c) => p + c?.votes_aggregate?.aggregate?.sum?.count || 0,
        0
      ) || 0,
      Math.max(
        ...(p.candidates?.map(
          (c) => c?.votes_aggregate?.aggregate?.sum?.count || 0
        ) ?? [])
      ) || 0,
    ];
  }, [p]);
  const [isDesktop] = useDesktop();

  return (
     <Box bgcolor="grey.100" pt={2}>
      <Box paddingX={2} className={classes.root}>
        <Box color="grey.900" className={classes.title}>
          {p.title}
          <Hidden smDown>
            <PostMenu post={p} />
          </Hidden>
        </Box>
        <Box mt={1}>
          <AvatarNameDate
            name={createdBy?.name}
            photo_url={createdBy?.photo_url}
            created_at={created_at}
          />
        </Box>
        <Box my={2}>
          <Divider light />
        </Box>
        <Grid container alignItems="center">
          <HowToVoteIcon color="primary" className={classes.icon} />
          <Box color="primary.dark" fontWeight={500}>
            <Typography variant="body1">{daysLeft}</Typography>
          </Box>
        </Grid>
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
        <Box className={classes.sub} mt={2} mb={1}>
          <Grid container alignItems="center" justify="space-between">
            <Box display="flex" alignItems="center">
              {metadata?.isAnonymous && <Box mr={1}>익명투표</Box>}
              {metadata?.isMultiple && <Box mr={1}>복수응답가능</Box>}
              {metadata?.isResultHidden && (
                <Box mr={1}>중간 투표 집계를 숨김</Box>
              )}
            </Box>
            <Box color="grey.900">참여자 {participantCount}명</Box>
          </Grid>
        </Box>
        <Box>
          {p.candidates?.map((c, i) => (
            <VoteCandidate
              candidate={c}
              voted={isVoted}
              max={maxVoteCount}
              total={totalVoteCount}
              onClick={voteHandler}
              key={i}
              isResultHidden={metadata?.isResultHidden}
            />
          ))}
        </Box>
        <Box mt={4} mb={isDesktop ? 5 : 2}>
          {isVoted && (
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setVoted(false)}
              className={classes.btn}
            >
              다시 투표하기
            </Button>
          )}
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
