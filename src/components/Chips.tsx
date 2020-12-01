import React, { Dispatch, SetStateAction } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Chip } from "@material-ui/core";
import { ChipData } from "../types";
import DoneIcon from "@material-ui/icons/Done";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
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
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    "&.MuiChip-clickable:hover, &.MuiChip-clickable:focus": {
      backgroundColor: theme.palette.primary.light,
      borderColor: theme.palette.primary.main,
    },
    "&.MuiChip-root .MuiChip-avatar": {
      color: theme.palette.common.white,
      width: 20,
      height: 20,
    },
  },
}));

export default function Chips({
  chips,
  setChips,
}: {
  chips: ChipData[];
  setChips: Dispatch<SetStateAction<ChipData[]>>;
}) {
  const classes = useStyles();
  const handleSelect = React.useCallback(
    (chipClicked: ChipData) => () => {
      chipClicked.selected = !chipClicked.selected;
      setChips((chips) => [...chips]);
    },
    [setChips]
  );
  return (
    <Paper component="ul" className={classes.root} elevation={0}>
      {chips.map((chip) => {
        return (
          <li key={chip.label}>
            <Chip
              avatar={chip.selected ? <DoneIcon /> : undefined}
              variant="outlined"
              label={"#" + chip.label}
              onClick={handleSelect(chip)}
              className={chip.selected ? classes.selected : classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
