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
  const count = c?.votes_aggregate?.aggregate?.sum?.count || 0;
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
          {c.votes.map((v,i) => (
            <AvatarNameVote user={v.user} key={i} />
          ))}
        </Container>
      </Paper>
    </Modal>
  );
  return { modal, isVisible, setVisible };
}
