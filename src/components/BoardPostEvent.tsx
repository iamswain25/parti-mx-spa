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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      border: `1px solid ${grey[200]}`,
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
      },
      borderRadius: theme.shape.borderRadius,
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
  const [isDesktop] = useDesktop();
  const attending = !!p.meLiked?.[0]?.like_count;
  return (
    <div onClick={() => navigatePost(p.id)} className={classes.container}>
      <Box mb={1} color="#a9aaad">
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
            <Box color="grey.600">
              <Typography variant={isDesktop ? "subtitle2" : "h6"}>
                {eventDate}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Box>
      <Box borderTop={1} borderColor="grey.200" pt={1} color="#a9aaad">
        <Typography variant="h6">
          <Grid container justify="space-between" wrap="wrap">
            <Box>
              <Box display="flex" alignItems="center">
                <HowToRegIcon />
                <Box ml={1}>
                  {p.users_aggregate.aggregate.sum.like_count}명 참석{" / "}
                  {countPeople}명 모집
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <EventIcon />
                <Box ml={1}>{deadline} 모집마감</Box>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <PlaceIcon />
                <Box ml={1}>{place}</Box>
              </Box>
            </Box>
            <Box color="primary.dark" display="flex" alignItems="flex-end">
              {attending ? (
                <Box display="flex" alignItems="center">
                  참석함
                  <CheckCircleIcon color="primary" />
                </Box>
              ) : (
                <Box display="flex" alignItems="center">
                  모집중
                  <HourglassEmptyIcon color="primary" />
                </Box>
              )}
            </Box>
          </Grid>
        </Typography>
      </Box>
    </div>
  );
}
