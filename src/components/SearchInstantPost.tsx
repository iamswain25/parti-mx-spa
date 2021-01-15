import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
// import BoardPostSub2 from "./BoardPostSub2";
import { Link } from "react-router-dom";
import { Highlight } from "react-instantsearch-dom";
import { semanticDate } from "../helpers/datefns";
import useUser from "../store/useUser";
const useStyles = makeStyles(theme => {
  return {
    container: {
      // borderBottom: `1px solid ${grey[200]}`,
      // padding: theme.spacing(1),
      cursor: "pointer",
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
    flexrowleft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    margin: {
      marginRight: theme.spacing(1),
    },
    icon: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        width: 13,
        height: 14,
      },
    },
  };
});

export default function SearchInstantPost({ hit: p }: { hit: any }) {
  const { objectID, created_by, count_like = 0, count_comment = 0 } = p;
  const [user] = useUser({ id: created_by });
  const classes = useStyles();
  return (
    <div className={classes.container}>
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
            <Grid item>댓글 {count_comment}</Grid>
            <Grid item>공감 {count_like}</Grid>
          </Grid>
        </Typography>
      </Link>
    </div>
  );
}
