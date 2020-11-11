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
import useDesktop from "./useDesktop";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import { daysLeftMeta } from "../helpers/datefns";
import VoteCandidate from "./VoteCandidate";
import useVoteCandidate from "./useVoteCandidate";
import PostMenu from "./PostMenu";
import FilesImages from "./FilesImages";
import ShareButtons from "./ShareButtons";
import HtmlOrBody from "./HtmlOrBody";
import useComments from "../store/useComments";
import useCandidates from "../store/useCandidates";
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
  const {
    images,
    count_comment,
    count_like,
    created_at,
    files,
    closed_at,
    name,
  } = p;
  const [comments] = useComments(p.id);
  const [candidates] = useCandidates({ post_id: p.id });
  const isClosed = !!closed_at;
  const metadata = p.metadata as VoteMetadata;
  const commentCount = count_comment || 0;
  const participantCount = count_like || 0;
  const daysLeft = React.useMemo(() => daysLeftMeta(metadata, created_at), [
    metadata,
    created_at,
  ]);
  const classes = useStyles();
  const voteHandler = useVoteCandidate(p);
  const [isVoted, setVoted] = React.useState(false);
  React.useEffect(() => {
    setVoted(!!p.my_like_count);
  }, [p]);
  const [totalVoteCount, maxVoteCount] = React.useMemo(() => {
    return [0, 0];
  }, []);
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
          <AvatarNameDate name={name} created_at={created_at} />
        </Box>
        <Box my={2}>
          <Divider light />
        </Box>
        {!isClosed && (
          <Grid container alignItems="center">
            <HowToVoteIcon color="primary" className={classes.icon} />
            <Box color="primary.dark" fontWeight={500}>
              <Typography variant="body1">{daysLeft}</Typography>
            </Box>
          </Grid>
        )}
        <FilesImages images={images} files={files} />
        <HtmlOrBody post={p} />
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
          {candidates?.map((c) => (
            <VoteCandidate
              candidate={c}
              voted={isVoted}
              max={maxVoteCount}
              total={totalVoteCount}
              onClick={voteHandler}
              key={c.id}
              isClosed={isClosed}
              isAnonymous={metadata?.isAnonymous}
              isResultHidden={metadata?.isResultHidden}
            />
          ))}
        </Box>
        <Box mt={4} mb={isDesktop ? 5 : 2}>
          {!isClosed && isVoted && (
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
      <div className={classes.root}>
        <CommentContainer comments={comments} post={p} count={commentCount} />
      </div>
    </Box>
  );
}
