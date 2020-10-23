import React from "react";
import { Candidate } from "../types";
import { Grid, Box } from "@material-ui/core";
import { LinearProgressActive, LinearProgressGrey } from "./LinearProgress";

export default function RoutePostVoteCandidate({
  candidate: c,
  total = 0,
  voted = false,
  max = 1,
  isClosed = false,
  isResultHidden = false,
}: {
  candidate: Candidate;
  total: number;
  max: number;
  voted: boolean;
  isClosed: boolean;
  isResultHidden: boolean;
}) {
  const [myVote, percentage, width] = React.useMemo(() => {
    const count = 0;
    return [
      true,
      Math.round((count * 100) / total) ?? 0,
      Math.round((count * 100) / max) || 0,
    ];
  }, [c, max, total]);
  return (
    <Box
      border={1}
      bgcolor={myVote && voted ? "background.paper" : "grey.50"}
      borderColor={myVote && voted ? "primary.dark" : "grey.200"}
      borderRadius={2}
      mb={1}
      p={2}
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
        {((!isResultHidden && voted) || isClosed) && (
          <Box
            fontSize={12}
            letterSpacing={-0.26}
            color="grey.900"
            fontWeight="bold"
          >
            {percentage}%
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
  );
}
