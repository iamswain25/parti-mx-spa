import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import PlaceIcon from "@material-ui/icons/Place";
import { EventMetadata } from "../types";
import EventIcon from "@material-ui/icons/Event";
import { getEventDate } from "../helpers/datefns";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "grid",
      gridGap: theme.spacing(1),
      "& div": {
        display: "flex",
        alignItems: "center",
        "& .text-primary": {
          color: theme.palette.text.primary,
          marginLeft: theme.spacing(1),
        },
      },
    },
  };
});

export default function EventMetadataInfo(props: { metadata: EventMetadata }) {
  let { eventDate, place, deadline, countPeople } = props.metadata;
  const classes = useStyles();
  eventDate = getEventDate(eventDate);
  deadline = getEventDate(deadline);
  return (
    <Typography variant="body1" color="primary" className={classes.root}>
      <div>
        <EventIcon />
        모임 일시
        <div className="text-primary">{eventDate}</div>
      </div>
      <div>
        <PlaceIcon />
        모임 장소
        <div className="text-primary">{place}</div>
      </div>
      <div>
        <HowToRegIcon />
        모집 인원
        <div className="text-primary"> {countPeople}명</div>
      </div>
      <div>
        <EventIcon />
        신청 기간
        <div className="text-primary">{deadline}까지</div>
      </div>
    </Typography>
  );
}
