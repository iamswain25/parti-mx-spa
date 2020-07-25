import React from "react";
import { Candidate } from "../types";
import { Grid, Box, Typography } from "@material-ui/core";
import { LinearProgressActive, LinearProgressGrey } from "./LinearProgress";
import CheckIcon from "@material-ui/icons/Check";
import useWhoVotedModal from "./useWhoVotedModal";
export default function VoteCandidate({
  candidate: c,
  total = 0,
  voted = false,
  isResultHidden = false,
  max = 1,
  onClick,
}: {
  candidate: Candidate;
  total: number;
  max: number;
  voted: boolean;
  isResultHidden: boolean;
  onClick: (candidate_id: number, myVote: boolean) => Promise<any>;
}) {
  const [myVote, percentage, width, count] = React.useMemo(() => {
    const count = c?.votes_aggregate?.aggregate?.sum?.count || 0;
    return [
      !!c?.myVote?.[0]?.count,
      Math.round((count * 100) / total) ?? 0,
      Math.round((count * 100) / max) || 0,
      count,
    ];
  }, [c, max, total]);
  function handler() {
    onClick(c?.id, myVote);
  }
  const { modal, setVisible } = useWhoVotedModal(c);
  function resultHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
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
        {!isResultHidden && voted && (
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
        style={{ cursor: "pointer" }}
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
