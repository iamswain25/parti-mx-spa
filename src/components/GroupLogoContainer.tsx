import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { semanticDate } from "../helpers/datefns";
import publicsphere from "../assets/images/publicsphere.jpg";
import { Link } from "react-router-dom";
import { Grid, Typography, Hidden } from "@material-ui/core";
import MenuGroup from "./MenuGroup";
import useGroup from "../store/useGroup";
import StorageImage from "./StorageImage";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.down("sm")]: {
        // marginTop: -(theme.mixins.toolbar.minHeight || 0),
      },
      [theme.breakpoints.up("md")]: {
        padding: "0 30px",
        position: "relative",
      },
    },
    groupLogoContainer: {
      [theme.breakpoints.up("md")]: {
        height: 260,
        maxWidth: 1140,
        "& > div": {
          height: "100%",
          "& > img": {
            height: "100%",
            width: "100%",
            objectFit: "cover",
          },
        },
      },
      [theme.breakpoints.down("sm")]: {
        // height: 180,
        display: "block",
        "& img": {
          // height: "100%",
          width: "100%",
          objectFit: "cover",
        },
      },
      width: "100%",
      position: "relative",
    },
    groupLogoOverlay: {
      [theme.breakpoints.up("md")]: {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        backgroundImage:
          "linear-gradient(rgba(0, 0 ,0, 0) 50%, rgba(0, 0, 0, 0.64))",
        color: theme.palette.common.white,
        padding: 19,
      },
      color: theme.palette.text.primary,
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    groupInfo: {
      display: "flex",
      gap: "10px",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0,
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        height: theme.spacing(6),
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1),
      },
      "& a": {
        color: "inherit",
      },
    },
    groupJoin: {
      width: 69,
      height: theme.spacing(3),
      borderRadius: 2,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[900],
      padding: 0,
      marginLeft: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
export default function GroupLogoContainer() {
  const [group] = useGroup(true);
  const classes = useStyles();
  const { title, status, created_at, bg_img, mb_img, user_count } = group || {};
  const isOrg = status === "organizer";
  return (
    <Grid container className={classes.container} justify="center">
      <div className={classes.groupLogoContainer}>
        <Hidden mdUp implementation="css">
          <StorageImage image={mb_img ?? bg_img} />
        </Hidden>
        <Hidden smDown implementation="css">
          <StorageImage image={bg_img ?? mb_img} />
        </Hidden>
        <div className={classes.groupLogoOverlay}>
          <Typography variant="h1" color="inherit">
            {title}
          </Typography>
          <div className={classes.groupInfo}>
            <span>개설 {semanticDate(created_at)}</span>
            {isOrg && <Link to="members">멤버 {user_count}</Link>}
            <MenuGroup group={group} />
          </div>
        </div>
      </div>
    </Grid>
  );
}
