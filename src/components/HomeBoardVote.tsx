import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import { grey } from "@material-ui/core/colors";
import BoardPostVote from "./BoardPostVote";
import { Typography, Grid, Box } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GreyDivider from "./GreyDivider";
import useDesktop from "./useDesktop";
import BoardMoreTag from "./BoardMoreTag";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5),
        border: `1px solid ${grey[300]}`,
        maxWidth: 364,
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
      },
      "& .custom-dot-list-style": {
        bottom: 24,
        "& .react-multi-carousel-dot button": {
          backgroundColor: grey[400],
          width: 8,
          height: 8,
          border: "none",
        },
        "& .react-multi-carousel-dot--active button": {
          backgroundColor: theme.palette.primary.dark,
          width: 12,
          height: 8,
          borderRadius: 4,
          border: "none",
        },
      },
    },
    titleContainer: {
      height: 57,
    },
    postContainer: {
      [theme.breakpoints.up("md")]: { backgroundColor: grey[100] },
    },
    btnLeft: {
      position: "absolute",
      left: 0,
    },
    btnRight: {
      position: "absolute",
      right: 0,
    },
    flexrowcenter: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
    },
  };
});

function CustomLeftArrow(props: any) {
  const classes = useStyles();
  const {
    onClick,
    // onMove,
    // carouselState: { currentSlide, deviceType },
  } = props;

  return (
    <IconButton onClick={() => onClick()} className={classes.btnLeft}>
      <ChevronLeftIcon color="primary" />
    </IconButton>
  );
}
function CustomRightArrow(props: any) {
  const classes = useStyles();
  const {
    onClick,
    // onMove,
    // carouselState: { currentSlide, deviceType },
  } = props;

  return (
    <IconButton onClick={() => onClick()} className={classes.btnRight}>
      <ChevronRightIcon color="primary" />
    </IconButton>
  );
}

export default function HomeBoardVote({ board: b }: { board: Board }) {
  const [isDesktop, theme] = useDesktop();
  const classes = useStyles();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: theme.breakpoints.values.md },
      items: 1,
    },
    tablet: {
      breakpoint: {
        max: theme.breakpoints.values.md,
        min: theme.breakpoints.values.sm,
      },
      items: 2,
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: {
        max: theme.breakpoints.values.sm,
        min: theme.breakpoints.values.xs,
      },
      items: 1,
      partialVisibilityGutter: 100,
    },
  };
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography variant={isDesktop ? "h2" : "h3"} color="textPrimary">
            <Box fontWeight="bold" ml={isDesktop ? 2 : 0}>
              {b?.title}
            </Box>
          </Typography>
          {isDesktop && (
            <Box mr={1}>
              <BoardMoreTag to={`/home/${b.id}`} />
            </Box>
          )}
        </Grid>
        <div className={classes.postContainer}>
          <Carousel
            responsive={responsive}
            showDots={isDesktop}
            arrows={isDesktop}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            dotListClass="custom-dot-list-style"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            partialVisible={true}
          >
            {b.posts.map((p, i) => (
              <BoardPostVote key={i} post={p} />
            ))}
          </Carousel>
        </div>
        {!isDesktop && <BoardMoreTag to={`/home/${b.id}`} />}
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
