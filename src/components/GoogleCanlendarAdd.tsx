import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Post, EventMetadata } from "../types";
import { getGoogleCalendarDate } from "../helpers/datefns";

const useStyles = makeStyles((theme) => {
  return {
    underline: {
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: theme.spacing(1),
      display: "block",
    },
  };
});

export default function GoogleCanlendarAdd(props: { post: Post }) {
  const classes = useStyles();
  const metadata = props.post.metadata as EventMetadata;
  const title = encodeURI(props.post.title);
  const place = encodeURI(metadata.place);
  const eventDate = getGoogleCalendarDate(metadata.eventDate);
  const body = encodeURI(props.post.body + "\n\n---\n" + window.location.href);
  return (
    <a
      className={classes.underline}
      target="_blank"
      rel="noopener noreferrer"
      href={
        `https://calendar.google.com/calendar/r/eventedit?` +
        `text=${title}` +
        `&dates=${eventDate}` +
        `&details=${body}` +
        `&location=${place}`
      }
    >
      <Typography variant="h5" color="textPrimary">
        Google 캘린더에 추가
      </Typography>
    </a>
  );
}
