import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
// import BoardPostSub2 from "./BoardPostSub2";
import { Link } from "react-router-dom";
import { Highlight } from "react-instantsearch-dom";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      // borderBottom: `1px solid ${grey[200]}`,
      // padding: theme.spacing(1),
    },
    titleContainer: {
      cursor: "pointer",
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
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Link to={`/post/${p.objectID}`}>
          <Typography variant="h3" color="textPrimary">
            <Highlight hit={p} attribute="title" />
          </Typography>
        </Link>
      </div>
      <Box color="grey.600">
        <Typography variant="body1" className={classes.body}>
          <Highlight hit={p} attribute="body" />
        </Typography>
      </Box>
    </div>
  );
}
