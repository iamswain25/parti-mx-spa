import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Select, MenuItem } from "@material-ui/core";
import { useGlobalState, keys } from "../store/useGlobalState";
const useStyles = makeStyles((theme) => {
  return {
    sort: {
      "&::before": {
        borderBottom: 0,
      },
      fontSize: 11,
      letterSpacing: -0.31,
      color: theme.palette.grey[900],
      [theme.breakpoints.up("md")]: {
        fontSize: 14,
        letterSpacing: -0.39,
      },
    },
  };
});

export default function PostSort() {
  const classes = useStyles();
  const [sort, setSort] = useGlobalState(keys.SORT);
  function handleChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const { value } = event.target;
    setSort(Number(value) ?? 0);
  }
  return (
    <Box display="flex">
      <Select value={sort} onChange={handleChange} className={classes.sort}>
        <MenuItem value={0}>Most recent registered</MenuItem>
        <MenuItem value={1}>Most recent Updated</MenuItem>
        <MenuItem value={2}>Most recent Comment</MenuItem>
      </Select>
    </Box>
  );
}
