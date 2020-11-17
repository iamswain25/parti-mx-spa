import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  tag: {
    margin: theme.spacing(0.5),
    color: theme.palette.primary.main,
  },
}));
export default function HashtagsDetail(props: { tags: string[] }) {
  const { tags } = props;
  const classes = useStyles();
  return (
    <Grid container>
      {tags?.map((chip) => {
        return (
          <span key={chip} className={classes.tag}>
            #{chip}
          </span>
        );
      })}
    </Grid>
  );
}
