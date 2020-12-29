import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { semanticDate } from "../helpers/datefns";
import { Link } from "react-router-dom";
import { Grid, Typography, Hidden } from "@material-ui/core";
import MenuGroup from "./MenuGroup";
import useGroup from "../store/useGroup";
import StorageImage from "./StorageImage";
import { useCurrentUser, useRole } from "../store/useGlobalState";
import useGroupJoin from "./useGroupJoin";
import { permissionLabelByValue } from "../helpers/options";
const useStyles = makeStyles((theme) => {
  return {
    container: {
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
        display: "block",
        "& img": {
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
  const [group] = useGroup();
  const classes = useStyles();
  const { title, created_at, bg_img, mb_img } = group || {};
  const [role] = useRole();
  const [currentUser] = useCurrentUser();
  const joinHandler = useGroupJoin();
  return (
    <Grid container className={classes.container} justify="center">
      <div className={classes.groupLogoContainer}>
        {mb_img && bg_img ? (
          <>
            <Hidden mdUp implementation="css">
              <StorageImage image={mb_img ?? bg_img} />
            </Hidden>
            <Hidden smDown implementation="css">
              <StorageImage image={bg_img ?? mb_img} />
            </Hidden>
          </>
        ) : (
          <div>
            <img src="/publicsphere.jpg" alt="public sphere" />
          </div>
        )}
        <div className={classes.groupLogoOverlay}>
          <Typography variant="h1" color="inherit">
            <Link to="/">{title}</Link>
          </Typography>
          <div className={classes.groupInfo}>
            <span>개설 {semanticDate(created_at)}</span>
            {role === undefined ? (
              <div>loading...</div>
            ) : (
              <Link to="/profile">
                {currentUser?.displayName}({permissionLabelByValue(role)})
              </Link>
            )}
            {role === "anonymous" && false && (
              <button className={classes.groupJoin} onClick={joinHandler}>
                그룹 가입
              </button>
            )}
            <MenuGroup group={group} />
          </div>
        </div>
      </div>
    </Grid>
  );
}
