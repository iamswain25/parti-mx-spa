import React from "react";
import {
  Modal,
  Paper,
  Container,
  makeStyles,
  Theme,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Candidate } from "../types";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AvatarNameVote from "./AvatarNameVote";
import useVotes from "../store/useVotes";
const useStyles = makeStyles((theme: Theme) => ({
  top: {
    [theme.breakpoints.up("md")]: {
      // display: "none",
    },
    minHeight: theme.mixins.toolbar.minHeight,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function useWhoVotedModal(c: Candidate) {
  const [isVisible, setVisible] = React.useState(false);
  const classes = useStyles();
  function handleClose() {
    setVisible(false);
  }
  const [votes] = useVotes({ candidate_id: c.id, post_id: c.post_id });
  const count = 0;
  const modal = (
    <Modal open={isVisible} onClose={handleClose}>
      <Paper>
        <div className={classes.top}>
          <IconButton onClick={handleClose} color="inherit">
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h2">
            {c.body}({count})
          </Typography>
          <div />
        </div>
        <Container>
          {votes.map((v) => (
            <AvatarNameVote user={v} key={v.id} />
          ))}
        </Container>
      </Paper>
    </Modal>
  );
  return { modal, isVisible, setVisible };
}
