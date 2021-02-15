import React from "react";
import { NoticeMetadata, Post } from "../types";
import { Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => {
  return {
    tag: {
      margin: theme.spacing(0.5),
      color: theme.palette.primary.main,
    },
  };
});

export default function TagsDetail({
  post: p,
}: {
  post: Post<NoticeMetadata>;
}) {
  const { tags, group_id } = p;
  const classes = useStyles();
  return (
    <Grid container>
      {tags?.map(chip => {
        return (
          <Link
            key={chip}
            className={classes.tag}
            to={{ pathname: `/${group_id}`, state: { tag: chip } }}
          >
            #{chip}
          </Link>
        );
      })}
    </Grid>
  );
}
