import React from "react";
import { Post, VoteCounter, VoteMetadata } from "../types";
import { Box, makeStyles, Button } from "@material-ui/core";
import useDesktop from "./useDesktop";
import VoteCandidate from "./VoteCandidate";
import useVoteCandidate from "./useVoteCandidate";
import useCandidates from "../store/useCandidates";
import usePostLiked from "../store/usePostLiked";
const useStyles = makeStyles((theme) => {
  return {
    btn: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderColor: theme.palette.primary.main,
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
  const [liked] = usePostLiked(p.id);
  const [candidates] = useCandidates({ post_id: p.id });
  const isClosed = !!p.is_closed;
  const classes = useStyles();
  const voteHandler = useVoteCandidate(p);
  const [isVoted, setVoted] = React.useState(false);
  React.useEffect(() => {
    setVoted(liked);
    console.log(liked);
  }, [liked]);
  const [isDesktop] = useDesktop();
  return (
    <Box>
      <Box>
        {candidates?.map((c) => (
          <VoteCandidate
            candidate={c}
            voted={isVoted}
            counter={counter}
            onClick={voteHandler}
            key={c.id}
            post={p}
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
  );
}
