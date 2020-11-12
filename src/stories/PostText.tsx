import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 1500,
    padding: 10,
    "&::before": {
      content: '""',
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      background: "linear-gradient(transparent 30px, white)"
    }
  }
}));

export default function PostText({content}) {
  const [expand, setExpand] = useState(false);
  const classes = useStyles();
  const onClick = () => {
    setExpand(!expand);
  };
  return (
    <ShowMoreText
    // className={classes.card}
    more={"Show More"}
    less={"Show Less"}
    lines={3}
    onClick={onClick}
    expanded={expand}
    >{content}
    </ShowMoreText>
  );
}
