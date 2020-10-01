import React from "react";
import { HomeGroup } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { semanticDate } from "../helpers/datefns";
import publicsphere from "../assets/images/publicsphere.jpg";
import { Link } from "react-router-dom";
import { Grid, Button, Typography, Hidden } from "@material-ui/core";
import MenuGroup from "./MenuGroup";
import usePermEffect from "./usePermEffect";
import { showStatusLabelByValue } from "../helpers/options";
import useGroupJoin from "./useGroupJoin";
import { useQuery } from "@apollo/client";
import { logoGroup } from "../graphql/query";
import { useStore } from "../store/store";
import useEffectRefetch from "./useEffectRefetch";

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
  const [{ group_id }] = useStore();
  const { data, loading, refetch } = useQuery<HomeGroup>(logoGroup, {
    variables: { group_id },
  });

  const group = data?.mx_groups_by_pk;
  const classes = useStyles();
  const { title, status, created_at, bg_img_url, mb_img_url, users_aggregate } =
    group || {};
  const userCount = users_aggregate?.aggregate?.count || 1;
  const joinHandler = useGroupJoin(userCount);
  useEffectRefetch(refetch);
  usePermEffect(status);
  if (loading) return null;
  if (!group) return null;
  const isOrg = status === "organizer";
  const toJoinTag = ["organizer", "user", "participant", "requested"].includes(
    status as string
  ) ? (
    <span>{showStatusLabelByValue(status)}</span>
  ) : (
    <Button className={classes.groupJoin} onClick={joinHandler}>
      그룹가입
    </Button>
  );
  return (
    <Grid container className={classes.container} justify="center">
      <div className={classes.groupLogoContainer}>
        <Hidden mdUp implementation="css">
          <img
            src={mb_img_url ?? bg_img_url ?? publicsphere}
            alt="group logo"
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <img
            src={bg_img_url ?? mb_img_url ?? publicsphere}
            alt="group logo"
          />
        </Hidden>
        <div className={classes.groupLogoOverlay}>
          <Typography variant="h1" color="inherit">
            {title}
          </Typography>
          <div className={classes.groupInfo}>
            <span>개설 {semanticDate(created_at)}</span>
            {isOrg ? (
              <Link to="members">멤버 {userCount}</Link>
            ) : (
              <span>멤버 {userCount}</span>
            )}
            {toJoinTag}
            <MenuGroup group={group} />
          </div>
        </div>
      </div>
    </Grid>
  );
}
