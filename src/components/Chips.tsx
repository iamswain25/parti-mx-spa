import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Chip } from "@material-ui/core";
import { ChipData } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: -2,
    margin: 0,
    fontFamily: "Roboto",
  },
  chip: {
    margin: theme.spacing(0.5),
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
  },
  selected: {
    margin: theme.spacing(0.5),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
    "&.MuiChip-clickable:hover, &.MuiChip-clickable:focus": {
      backgroundColor: theme.palette.primary.light,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function Chips({
  chips,
  setChips,
}: {
  chips: ChipData[];
  setChips: any;
}) {
  const classes = useStyles();
  function handleSelect(chipClicked: ChipData) {
    return function () {
      chipClicked.selected = !chipClicked.selected;
      setChips([...chips]);
    };
  }
  return (
    <Paper component="ul" className={classes.root} elevation={0}>
      {chips.map((chip) => {
        return (
          <li key={chip.label}>
            <Chip
              variant="outlined"
              label={chip.label}
              onClick={handleSelect(chip)}
              className={chip.selected ? classes.selected : classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
