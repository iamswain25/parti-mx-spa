import React from "react";
import { Post, VoteMetadata } from "../types";
import { Box, makeStyles, Button, Grid } from "@material-ui/core";
import useDesktop from "./useDesktop";
import VoteCandidate from "./VoteCandidate";
import useVoteCandidate from "./useVoteCandidate";
import useCandidates from "../store/useCandidates";
const useStyles = makeStyles(theme => {
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
  post: p,
}: {
  post: Post<VoteMetadata>;
}) {
  const [candidates] = useCandidates({ post_id: p.id });
  const [liked, setLiked] = React.useState(false);
  React.useEffect(() => {
    if (candidates) {
      setLiked(candidates.some(c => c.voted));
    }
  }, [candidates, setLiked]);
  const isClosed = p.is_closed;
  const metadata = p.metadata;
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const voteHandler = useVoteCandidate(p, candidates);
  const [max, total] = React.useMemo(
    () => [
      candidates?.reduce(
        (prev, curr) => (prev > curr.count_vote ? prev : curr.count_vote),
        1,
      ) || 1,
      candidates?.reduce((prev, curr) => prev + curr.count_vote, 0) || 1,
    ],
    [candidates],
  );

  return (
    <Box>
      <Box className={classes.sub} mt={2} mb={1}>
        <Grid container alignItems="center" justify="space-between">
          <Box display="flex" alignItems="center">
            {metadata?.is_anonymous && <Box mr={1}>익명투표</Box>}
            {metadata?.is_multiple && <Box mr={1}>복수응답가능</Box>}
            {metadata?.is_result_hidden && (
              <Box mr={1}>중간 투표 집계를 숨김</Box>
            )}
          </Box>
          <Box color="grey.900">참여자 {p?.count_like || 0}명</Box>
        </Grid>
      </Box>
      <Box>
        {candidates?.map(c => (
          <VoteCandidate
            max={max}
            total={total}
            candidate={c}
            voted={liked}
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
