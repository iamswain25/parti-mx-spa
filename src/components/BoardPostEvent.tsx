import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import { getEventDate2, getEventDate3 } from "../helpers/datefns";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import PlaceIcon from "@material-ui/icons/Place";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: `1px solid ${grey[200]}`,
      padding: theme.spacing(2),
      borderRadius: 4,
      backgroundColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.12)",
      boxShadow: theme.shadows[1],
    },
    titleContainer: {
      display: "flex",
      overflow: "hidden",
      maxHeight: 44,
      marginBottom: 8,
      justifyContent: "center",
    },
    imgContainer: {
      width: 76,
      height: 76,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2.5,
      backgroundColor: grey[200],
      overflow: "hidden",
      marginRight: theme.spacing(1),
      "& img": {
        width: "inherit",
        height: "inherit",
        objectFit: "cover",
      },
    },
  };
});
const marginRight8 = { mr: 1 };
export default function BoardPostVEvent({ post: p }: { post: Post }) {
  const classes = useStyles();
  const navigatePost = useNavigateToPost();
  let eventDate = null,
    place = null,
    deadline = null,
    countPeople = null;
  if (p?.metadata && "eventDate" in p?.metadata) {
    eventDate = getEventDate2(p.metadata.eventDate);
    countPeople = p.metadata.countPeople;
    place = p.metadata.place;
    deadline = getEventDate3(p.metadata.deadline);
  }
  const firstImage = p.images?.[0].uri;

  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      <Grid container direction="row">
        <div className={classes.imgContainer}>
          {firstImage ? <img src={firstImage} alt="event" /> : <EventIcon />}
        </div>
        <Grid>
          <Box className={classes.titleContainer}>
            <Typography variant="h4">{p.title}</Typography>
          </Box>
          <Typography variant="subtitle2">{eventDate}</Typography>
        </Grid>
        <Typography variant="h6">
          <Grid container alignItems="center">
            <HowToRegIcon />
            <Box css={marginRight8}>
              {p.users_aggregate.aggregate.sum.like_count}명 참석{" / "}
              {countPeople}명 모집
            </Box>
          </Grid>
          <Grid container alignItems="center">
            <EventIcon />
            <Box css={marginRight8}>{deadline} 모집마감</Box>
          </Grid>
          <Grid container alignItems="center">
            <PlaceIcon />
            <Box css={marginRight8}>{place}</Box>
          </Grid>
        </Typography>
      </Grid>
    </div>
  );
}
