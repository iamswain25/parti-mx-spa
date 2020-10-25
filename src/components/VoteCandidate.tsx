import React from "react";
import { Candidate } from "../types";
import { Grid, Box, Typography } from "@material-ui/core";
import { LinearProgressActive, LinearProgressGrey } from "./LinearProgress";
import CheckIcon from "@material-ui/icons/Check";
import useWhoVotedModal from "./useWhoVotedModal";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function VoteCandidate({
  candidate: c,
  total = 0,
  voted = false,
  isResultHidden = false,
  isAnonymous = false,
  max = 1,
  onClick,
  isClosed,
}: {
  candidate: Candidate;
  total: number;
  max: number;
  voted: boolean;
  isResultHidden: boolean;
  isAnonymous: boolean;
  isClosed: boolean;
  onClick: (candidate_id: string, myVote: boolean) => Promise<any>;
}) {
  const [, setError] = useGlobalState(keys.ERROR);
  const [myVote, percentage, width, count] = React.useMemo(() => {
    const count = 0;
    return [
      true,
      Math.round((count * 100) / total) ?? 0,
      Math.round((count * 100) / max) || 0,
      count,
    ];
  }, [max, total]);
  function handler() {
    if (isClosed) return;
    onClick(c?.id, myVote);
  }
  const { modal, setVisible } = useWhoVotedModal(c);
  function resultHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (isAnonymous) {
      return setError("익명투표 입니다.");
    }
    setVisible(true);
  }
  return (
    <Box display="flex" alignItems="stretch" mb={1}>
      <Box
        border={1}
        borderColor={myVote && voted ? "primary.dark" : "grey.200"}
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
        {((!isResultHidden && voted) || isClosed) && (
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
        style={{ cursor: isClosed ? "default" : "pointer" }}
        justifyContent="center"
        onClick={handler}
        bgcolor={myVote && voted ? "primary.dark" : "grey.200"}
        color={myVote && voted ? "primary.light" : "grey.400"}
      >
        <CheckIcon />
      </Box>
      {modal}
    </Box>
  );
}
