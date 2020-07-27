import React from "react";
import { useStore } from "../store/store";
import { Group } from "../types";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { semanticDate } from "../helpers/datefns";
import { insertUserGroup } from "../graphql/mutation";
import publicsphere from "../assets/images/publicsphere.jpg";
import { useHistory } from "react-router-dom";
import { Box, Grid, Button, Typography } from "@material-ui/core";
import MenuGroup from "./MenuGroup";
import usePermEffect from "./usePermEffect";
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
        "& img": {
          height: "100%",
          width: "100%",
          objectFit: "cover",
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
          "linear-gradient(rgba(0, 0 ,0, 0.02), rgba(0, 0, 0, 0.64))",
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
export default function GroupLogoContainer({ group }: { group: Group }) {
  const [{ user_id, group_id }] = useStore();
  const classes = useStyles();
  const history = useHistory();
  const [join, { loading, error }] = useMutation(insertUserGroup, {
    variables: { group_id },
  });
  async function joinHandler() {
    if (user_id) {
      await join();
      window.location.reload();
    } else {
      history.push("/login");
    }
  }
  useLoadingEffect(loading);
  useErrorEffect(error);
  const {
    title,
    users: [user] = [null],
    created_at,
    bg_img_url,
    users_aggregate: {
      aggregate: { count: userCount = 0 },
    },
  } = group;
  const userStatus = user?.status;
  usePermEffect(userStatus);
  const isOrg = userStatus === "organizer";
  const isUser = userStatus === "user";
  const toJoinTag =
    isUser || isOrg ? (
      <Typography>{user?.status}</Typography>
    ) : (
      <Button className={classes.groupJoin} onClick={joinHandler}>
        그룹가입
      </Button>
    );
  return (
    <Grid container className={classes.container} justify="center">
      <div className={classes.groupLogoContainer}>
        <img src={bg_img_url ?? publicsphere} alt="group logo" />
        <div className={classes.groupLogoOverlay}>
          <Typography variant="h1" color="inherit">
            {title}
          </Typography>
          <div className={classes.groupInfo}>
            <span>개설 {semanticDate(created_at)}</span>
            <span>멤버 {userCount}</span>
            {toJoinTag}
            <MenuGroup group={group} />
          </div>
        </div>
      </div>
    </Grid>
  );
}
