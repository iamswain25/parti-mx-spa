import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, LinearProgress } from "@material-ui/core";
import useGroup from "../store/useGroup";
import { useRole } from "../store/useGlobalState";
import InfoGroup from "./InfoGroup";
import useDesktop from "./useDesktop";
import StorageImage from "./StorageImage";
import { Img } from "../types";
const useStyles = makeStyles(theme => {
  return {
    container: {
      position: "relative",
      maxWidth: 1140,
      margin: "0 auto",
      backgroundColor: theme.palette.primary.main,
      overflow: "hidden",
      // [theme.breakpoints.up("md")]: {
      //   padding: `0 30px ${theme.spacing(5)}px`,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   padding: `0 ${theme.spacing(2)}px ${theme.spacing(5)}px`,
      // },
    },
    backgroundImg: {
      // position: "absolute",
      objectFit: "cover",
      width: "100%",
      // height: "100%",
      [theme.breakpoints.up("md")]: {
        height: 260,
      },
      [theme.breakpoints.down("sm")]: {
        height: "intrinsic",
      },
    },
  };
});
export default function GroupLogoContainer() {
  const [group] = useGroup();
  const classes = useStyles();
  const [role] = useRole();
  const [isDesktop] = useDesktop();
  if (group === undefined) {
    return <LinearProgress />;
  }
  return (
    <Grid container className={classes.container} justify="center">
      <StorageImage
        image={
          isDesktop
            ? group?.bg_img ??
              group?.mb_img ??
              ({ path: "/publicsphere.jpg" } as Img)
            : group?.mb_img ??
              group?.bg_img ??
              ({ path: "/publicsphere-mobile.jpg" } as Img)
        }
        className={classes.backgroundImg}
      />
      <InfoGroup group={group} role={role} />
    </Grid>
  );
}
