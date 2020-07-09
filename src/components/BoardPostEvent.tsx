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
import useDesktop from "./useDesktop";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      border: `1px solid ${grey[200]}`,
      padding: theme.spacing(2),
      borderRadius: 4,
      backgroundColor: theme.palette.background.paper,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: theme.palette.divider,
      boxShadow: theme.shadows[1],
    },
    titleContainer: {
      overflow: "hidden",
      maxHeight: 44,
    },
    imgContainer: {
      maxWidth: 76,
      maxHeight: 76,
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
  const isDesktop = useDesktop();
  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      <Box mb={1}>
        <Grid container direction="row" alignItems="center">
          <div className={classes.imgContainer}>
            {firstImage ? <img src={firstImage} alt="event" /> : <EventIcon />}
          </div>
          <Box>
            <Box mb={1} className={classes.titleContainer}>
              <Typography variant={"h4"} color="textPrimary">
                {p.title}
              </Typography>
            </Box>
            <Typography variant={isDesktop ? "subtitle2" : "h6"}>
              {eventDate}
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Box borderTop={1} borderColor="grey.200" pt={1}>
        <Typography variant="h6">
          <Grid container alignItems="center">
            <HowToRegIcon />
            <Box mr={1}>
              {p.users_aggregate.aggregate.sum.like_count}명 참석{" / "}
              {countPeople}명 모집
            </Box>
          </Grid>
          <Grid container alignItems="center">
            <EventIcon />
            <Box mr={1}>{deadline} 모집마감</Box>
          </Grid>
          <Grid container alignItems="center">
            <PlaceIcon />
            <Box mr={1}>{place}</Box>
          </Grid>
        </Typography>
      </Box>
    </div>
  );
}
