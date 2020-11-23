import React from "react";
import { Post, VoteCounter, VoteMetadata } from "../types";
import { Box, makeStyles, Button, Grid } from "@material-ui/core";
import useDesktop from "./useDesktop";
import VoteCandidate from "./VoteCandidate";
import useVoteCandidate from "./useVoteCandidate";
import useCandidates from "../store/useCandidates";
const useStyles = makeStyles((theme) => {
  return {
    btn: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderColor: theme.palette.primary.main,
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
  };
});

export default function CandidatesDetail({
  counter,
  post: p,
}: {
  post: Post<VoteMetadata>;
  counter?: VoteCounter | null;
}) {
  const [candidates] = useCandidates({ post_id: p.id });
  const [liked, setLiked] = React.useState(false);
  React.useEffect(() => {
    if (candidates) {
      setLiked(candidates.some((c) => c.voted));
    }
  }, [candidates, setLiked]);
  const isClosed = p.is_closed;
  const metadata = p.metadata;
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const voteHandler = useVoteCandidate(p, candidates);
  return (
    <Box>
      <Box className={classes.sub} mt={2} mb={1}>
        <Grid container alignItems="center" justify="space-between">
          <Box display="flex" alignItems="center">
            {metadata?.isAnonymous && <Box mr={1}>익명투표</Box>}
            {metadata?.isMultiple && <Box mr={1}>복수응답가능</Box>}
            {metadata?.isResultHidden && (
              <Box mr={1}>중간 투표 집계를 숨김</Box>
            )}
          </Box>
          <Box color="grey.900">참여자 {counter?.count_like || 0}명</Box>
        </Grid>
      </Box>
      <Box>
        {candidates?.map((c) => (
          <VoteCandidate
            candidate={c}
            voted={liked}
            counter={counter}
            onClick={voteHandler(c, liked)}
            key={c.id}
            post={p}
          />
        ))}
      </Box>
      <Box mt={4} mb={isDesktop ? 5 : 2}>
        {!isClosed && liked && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setLiked(false)}
            className={classes.btn}
          >
            다시 투표하기
          </Button>
        )}
      </Box>
    </Box>
  );
}
