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
import { Box, Grid } from "@material-ui/core";
import useDesktop from "./useDesktop";
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
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    groupInfo: {
      display: "flex",
      gap: 10,
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0,
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1),
      },
    },
    groupJoin: {
      width: 69,
      height: theme.spacing(3),
      borderRadius: 2,
      [theme.breakpoints.down("sm")]: {
        backgroundColor: theme.palette.background.paper,
      },
      backgroundColor: theme.palette.grey[900],
      paddingLeft: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
export default function GroupLogoContainer({ group }: { group: Group }) {
  const [{ user_id, group_id }, dispatch] = useStore();
  const classes = useStyles();
  const history = useHistory();
  const [join, { loading, error }] = useMutation(insertUserGroup, {
    variables: { group_id },
  });
  async function joinHandler() {
    if (user_id) {
      await join();
      dispatch({ type: "SET_USER", user_id });
    } else {
      history.push("/login");
    }
  }
  useLoadingEffect(loading);
  useErrorEffect(error);
  const [isDesktop] = useDesktop();
  const {
    bg_img_url,
    title,
    created_at,
    users_aggregate,
    users: [user],
  } = group;
  const toJoinTag = user ? (
    <div>{user?.status}</div>
  ) : (
    <button className={classes.groupJoin} onClick={joinHandler}>
      그룹가입
    </button>
  );
  return (
    <Grid container className={classes.container} justify="center">
      <div className={classes.groupLogoContainer}>
        <img src={bg_img_url ?? publicsphere} alt="group logo" />
        <div className={classes.groupLogoOverlay}>
          <Box
            fontSize={isDesktop ? 34 : 24}
            letterSpacing={isDesktop ? -1.8 : -0.5}
            color={isDesktop ? "common.white" : "text.primary"}
          >
            {title}
          </Box>
          <div className={classes.groupInfo}>
            <Box>개설 {semanticDate(created_at)}</Box>
            <Box paddingX={1}>멤버 {users_aggregate?.aggregate.count ?? 0}</Box>
            {toJoinTag}
          </div>
        </div>
      </div>
    </Grid>
  );
}
