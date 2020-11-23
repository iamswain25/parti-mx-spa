import React from "react";
import { Candidate, Post, VoteCounter, VoteMetadata } from "../types";
import { Grid, Box, Typography, LinearProgress } from "@material-ui/core";
import { LinearProgressActive, LinearProgressGrey } from "./LinearProgress";
import CheckIcon from "@material-ui/icons/Check";
import useWhoVotedModal from "./useWhoVotedModal";
import { useError } from "../store/useGlobalState";
import useVotedCandidate from "../store/useVotedCandidate";
import useCandidateCounter from "../store/useCandidateCounter";

export default function VoteCandidate({
  candidate: c,
  counter,
  voted = false,
  post,
  onClick,
}: {
  candidate: Candidate;
  counter?: VoteCounter | null;
  voted: boolean;
  post: Post<VoteMetadata>;
  onClick: (candidate_id: string, myVote: boolean) => Promise<any>;
}) {
  const [myVote] = useVotedCandidate({ post_id: post.id, candidate_id: c.id });
  const [votes] = useCandidateCounter({
    post_id: post.id,
    candidate_id: c.id,
  });
  const {
    metadata: { isResultHidden = false, isAnonymous = false },
    is_closed = false,
  } = post;
  const [, setError] = useError();
  const { count_total_vote: total = 0, count_max_vote: max = 1 } =
    counter || {};
  const [percentage, width, count] = React.useMemo(() => {
    const count = votes?.count_vote || 0;
    return [
      Math.round((count * 100) / total) ?? 0,
      Math.round((count * 100) / max) || 0,
      count,
    ];
  }, [max, total, votes]);
  function handler() {
    if (is_closed) return;
    if (myVote === undefined) return;
    onClick(c?.id, myVote);
  }
  const { modal, setVisible } = useWhoVotedModal(c);
  function resultHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (isAnonymous) {
      return setError("익명투표 입니다.");
    }
    setVisible(true);
  }
  if (myVote === undefined) {
    return <LinearProgress />;
  }
  return (
    <Box display="flex" alignItems="stretch" mb={1}>
      <Box
        border={1}
        borderColor={myVote ? "primary.dark" : "grey.200"}
        borderRadius={2}
        p={2}
        flex={1}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Box fontSize={12} letterSpacing={-0.26} color="grey.900">
            {c.body}
          </Box>
          {!isResultHidden && voted && (
            <Box
              letterSpacing={-0.26}
              color="grey.900"
              fontWeight={count ? "bold" : "normal"}
              style={{ cursor: count ? "pointer" : "default" }}
              onClick={count ? resultHandler : undefined}
            >
              <Typography variant="body1">
                {percentage}% ({count}표)
              </Typography>
            </Box>
          )}
        </Grid>
        {((!isResultHidden && voted) || is_closed) && (
          <Box mt={1}>
            {myVote ? (
              <LinearProgressActive variant="determinate" value={width} />
            ) : (
              <LinearProgressGrey variant="determinate" value={width} />
            )}
          </Box>
        )}
      </Box>
      <Box
        width={50}
        display="flex"
        alignItems="center"
        style={{ cursor: is_closed ? "default" : "pointer" }}
        justifyContent="center"
        onClick={handler}
        bgcolor={myVote ? "primary.dark" : "grey.200"}
        color={myVote ? "common.white" : "grey.400"}
      >
        <CheckIcon />
      </Box>
      {modal}
    </Box>
  );
}
