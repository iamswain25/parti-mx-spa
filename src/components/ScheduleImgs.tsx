import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import mobile from "../assets/images/mobile-schedule.png";
import desktop from "../assets/images/desktop-schedule.png";
import tablet from "../assets/images/tablet-schedule.png";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      "&>.title": {
        [theme.breakpoints.down("sm")]: {
          marginLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        },
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(5),
      },
      "&>.container": {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(5),
        "&>img": {
          display: "none",
          objectFit: "contain",
          "&.desktop": {
            [theme.breakpoints.up("md")]: {
              display: "block",
            },
          },
          "&.mobile": {
            [theme.breakpoints.down("xs")]: {
              display: "block",
            },
          },
          "&.tablet": {
            [theme.breakpoints.only("sm")]: {
              display: "block",
            },
          },
        },
      },
    },
  };
});
export default function ScheduleImgs() {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div className="title">
        <Typography variant="h2" color="textPrimary">
          <Box fontWeight="bold">주요일정</Box>
        </Typography>
      </div>
      <div className="container">
        <img src={desktop} alt="desktop" className="desktop" />
        <img src={tablet} alt="tablet" className="tablet" />
        <img src={mobile} alt="mobile" className="mobile" />
      </div>
    </section>
  );
}
