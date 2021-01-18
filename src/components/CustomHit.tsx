import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Highlight } from "react-instantsearch-dom";
import { semanticDate } from "../helpers/datefns";
import useUser from "../store/useUser";
const useStyles = makeStyles(theme => {
  return {
    container: {
      cursor: "pointer",
      padding: theme.spacing(2),
      borderBottom: "1px solid " + theme.palette.divider,
    },
    titleContainer: {
      display: "flex",
      overflow: "hidden",
      marginBottom: theme.spacing(1),
    },
    body: {
      whiteSpace: "pre-wrap",
      marginBottom: theme.spacing(1),
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 6,
      WebkitBoxOrient: "vertical",
    },
    postInfo: {
      marginTop: theme.spacing(1),
    },
  };
});

export default function CustomHit({ hit: p }: { hit: any }) {
  const {
    objectID,
    created_at,
    created_by,
    count_like = 0,
    count_comment = 0,
  } = p;
  const [user] = useUser({ id: created_by });
  const classes = useStyles();
  const created_date = new Date(created_at._seconds * 1000);
  return (
    <Paper elevation={0} className={classes.container}>
      <Link to={`/post/${objectID}`}>
        <div className={classes.titleContainer}>
          <Typography variant="h3" color="textPrimary">
            <Highlight hit={p} attribute="title" tagName="span" />
          </Typography>
        </div>
        <Typography variant="body1" className={classes.body}>
          <Highlight hit={p} attribute="body" tagName="span" />
          <Grid
            container
            justify="flex-start"
            spacing={1}
            className={classes.postInfo}
          >
            <Grid item>{user?.name}</Grid>
            <Grid item>
              {created_date.toLocaleString("ko-KR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </Grid>
            <Grid item>댓글 {count_comment}</Grid>
            <Grid item>공감 {count_like}</Grid>
          </Grid>
        </Typography>
      </Link>
    </Paper>
  );
}
