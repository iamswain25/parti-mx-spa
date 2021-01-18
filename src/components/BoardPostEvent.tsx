import React from "react";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import { getEventDate2, getEventDate3 } from "../helpers/datefns";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import PlaceIcon from "@material-ui/icons/Place";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import StorageImage from "./StorageImage";
import usePostLiked from "../store/usePostLiked";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("md")]: {
        // borderBottom: "1px solid " + theme.palette.divider,
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.divider,
      },
    },
    titleContainer: {
      overflow: "hidden",
      flex: 1,
    },
    imgContainer: {
      [theme.breakpoints.up("md")]: {
        flexBasis: 76,
        flex: 0,
        height: 76,
        marginRight: theme.spacing(1),
      },
      [theme.breakpoints.down("sm")]: {
        // margin: -theme.spacing(1),
        // marginBottom: theme.spacing(1),
        height: 76,
        minWidth: 76,
      },
      display: "flex",
      overflow: "hidden",
      borderRadius: 2.5,
      "&>a": {
        flex: 1,
        backgroundColor: grey[200],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        cursor: "pointer",
        "& img": {
          width: "inherit",
          height: "inherit",
          objectFit: "cover",
        },
      },
    },
  };
});
export default function BoardPostVEvent({ post: p }: { post: Post }) {
  const classes = useStyles();
  let event_date = null,
    place = null,
    deadline = null,
    count_people = null;
  if (p?.metadata && "event_date" in p?.metadata) {
    event_date = getEventDate2(p.metadata.event_date);
    count_people = p.metadata.count_people;
    place = p.metadata.place;
    deadline = getEventDate3(p.metadata.deadline);
  }
  const firstImage = p.images?.[0];
  const [liked] = usePostLiked(p.id);
  return (
    <div className={classes.container}>
      <Box mb={1} color="#a9aaad">
        <Grid container spacing={1}>
          <Grid item className={classes.imgContainer}>
            <Link to={`/post/${p.id}`}>
              {firstImage ? <StorageImage image={firstImage} /> : <EventIcon />}
            </Link>
          </Grid>
          <Grid item className={classes.titleContainer}>
            <Link to={`/post/${p.id}`}>
              <Box mb={1}>
                <Typography variant={"h4"} color="textPrimary">
                  {p.title}
                </Typography>
              </Box>
            </Link>
            <Box color="grey.600">
              <Typography variant="subtitle2">{event_date}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        borderTop={1}
        borderColor="grey.200"
        pt={1}
        color={p.is_closed ? "#a9aaad" : "textPrimary"}
      >
        <Typography variant="h6">
          <Grid container justify="space-between" wrap="wrap">
            <Box>
              <Box display="flex" alignItems="center">
                <HowToRegIcon />
                <Box ml={1}>모집인원 {count_people}명</Box>
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
            <Box
              color="primary.dark"
              display="flex"
              alignItems="flex-end"
              flex={1}
              justifyContent="flex-end"
              p={1}
            >
              {p.is_closed ? (
                <Box display="flex" alignItems="center">
                  완료
                  <CheckCircleIcon color="primary" />
                </Box>
              ) : liked ? (
                <Box display="flex" alignItems="center">
                  공감함
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
