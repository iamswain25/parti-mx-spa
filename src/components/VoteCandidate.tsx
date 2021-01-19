import React from "react";
import { Candidate, Post, VoteMetadata } from "../types";
import { Grid, Box, Typography } from "@material-ui/core";
import { LinearProgressActive, LinearProgressGrey } from "./LinearProgress";
import CheckIcon from "@material-ui/icons/Check";
import useWhoVotedModal from "./useWhoVotedModal";
import { useError } from "../store/useGlobalState";
export default function VoteCandidate({
  candidate: c,
  voted = false,
  post,
  onClick,
  max,
  total = 1,
}: {
  candidate: Candidate;
  voted: boolean;
  post: Post<VoteMetadata>;
  onClick: () => any;
  max: number;
  total: number;
}) {
  const {
    metadata: { is_result_hidden = false, is_anonymous = false },
    is_closed = false,
  } = post;
  const [, setError] = useError();
  const [percentage, width, count] = React.useMemo(() => {
    const count = c?.count_vote || 0;
    return [
      Math.round((count * 100) / total) ?? 0,
      Math.round((count * 100) / max) || 0,
      count,
    ];
  }, [max, total, c]);
  const { modal, setVisible } = useWhoVotedModal(c);
  function resultHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (is_anonymous) {
      return setError("익명투표 입니다.");
    }
    setVisible(true);
  }
  return (
    <Box display="flex" alignItems="stretch" mb={1}>
      <Box
        border={1}
        borderColor={voted && c.voted ? "primary.dark" : "grey.200"}
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
          {!is_result_hidden && voted && (
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
        {((!is_result_hidden && voted) || is_closed) && (
          <Box mt={1}>
            {c.voted ? (
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
        onClick={onClick}
        bgcolor={voted && c.voted ? "primary.dark" : "grey.200"}
        color={voted && c.voted ? "common.white" : "grey.400"}
      >
        <CheckIcon />
      </Box>
      {modal}
    </Box>
  );
}
