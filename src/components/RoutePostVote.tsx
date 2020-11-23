import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post, VoteMetadata } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Button, Divider } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import useDesktop from "./useDesktop";
import { daysLeftMeta } from "../helpers/datefns";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RoutePostVoteCandidate from "./RoutePostVoteCandidate";
import GreyDivider from "./GreyDivider";
import useCandidates from "../store/useCandidates";
import usePostLiked from "../store/usePostLiked";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      borderBottom: `1px solid ${grey[200]}`,
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        // height: 145,
      },
    },
    title: {
      [theme.breakpoints.down("sm")]: {
        letterSpacing: -0.35,
      },
    },
    titleContainer: {
      cursor: "pointer",
      display: "flex",
      overflow: "hidden",
      maxHeight: theme.spacing(6),
    },
    body: {
      whiteSpace: "pre-wrap",
      maxHeight: theme.spacing(5),
      marginBottom: theme.spacing(1),
      overflow: "hidden",
    },
    icon: {
      width: 15,
      height: 17,
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: 12,
        height: 13,
      },
    },
    btnLight: {
      backgroundColor: theme.palette.primary.light,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bbe7d6",
      color: theme.palette.primary.dark,
    },
    btnDark: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  };
});

export default function RoutePostVote({ post: p }: { post: Post }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  // const [liked] = usePostLiked(p.id);
  const navigatePost = useNavigateToPost(p.id);
  const created_at = p.created_at;
  const metadata = p.metadata as VoteMetadata;
  const daysLeft = React.useMemo(() => daysLeftMeta(metadata, created_at), [
    metadata,
    created_at,
  ]);
  const [isVoted, setVoted] = React.useState(false);
  const isClosed = !!p?.closed_at;
  const isResultHidden = metadata.isResultHidden;
  const [candidates] = useCandidates({ post_id: p.id });
  React.useEffect(() => {
    setVoted(false);
  }, [p]);
  const [totalVoteCount, maxVoteCount] = React.useMemo(() => {
    return [0, 0];
  }, []);
  return (
    <>
      <div className={classes.container}>
        <Grid container alignItems="center">
          <HowToVoteIcon color="primary" className={classes.icon} />
          <Box color="primary.dark" fontWeight={500}>
            <Typography variant="body1">{daysLeft}</Typography>
          </Box>
        </Grid>
        <Box className={classes.titleContainer} mt={1} onClick={navigatePost}>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.title}
          >
            {p.title}
          </Typography>
        </Box>
        {!isDesktop && (
          <>
            <Box mt={1}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Box color="grey.600" fontWeight={400}>
                  <Typography variant="body2">참여자 0명</Typography>
                </Box>
                {isVoted && (
                  <Box
                    color="primary.dark"
                    fontWeight={500}
                    display="flex"
                    alignItems="center"
                  >
                    <Typography variant="body2">투표완료</Typography>
                    <CheckCircleIcon
                      color="primary"
                      style={{ width: 14, height: 14 }}
                    />
                  </Box>
                )}
              </Grid>
            </Box>
            <Box mt={1}>
              {candidates.map((c, i) => (
                <RoutePostVoteCandidate
                  candidate={c}
                  voted={isVoted}
                  max={maxVoteCount}
                  total={totalVoteCount}
                  key={i}
                  isClosed={isClosed}
                  isResultHidden={isResultHidden}
                />
              ))}
            </Box>
            <Box color="common.white" fontWeight={500} mt={2} pb={2}>
              {isVoted ? (
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.btnLight}
                  onClick={navigatePost}
                >
                  다시 투표하기
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.btnDark}
                  onClick={navigatePost}
                >
                  투표하기
                </Button>
              )}
            </Box>

            <Box marginX={-1}>
              <Divider light />
            </Box>
          </>
        )}
        <Box mt={2}>
          <BoardPostSub2 post={p} />
        </Box>
      </div>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
