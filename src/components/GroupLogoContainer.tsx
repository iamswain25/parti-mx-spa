import React from "react";
import { useStore } from "../store/store";
import { HomeGroup } from "../types";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { semanticDate } from "../helpers/datefns";
import { insertUserGroup } from "../graphql/mutation";
import publicsphere from "../assets/images/publicsphere.jpg";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => {
  return {
    groupLogoContainer: {
      [theme.breakpoints.up("md")]: {
        height: 260,
      },
      [theme.breakpoints.down("sm")]: {
        height: 180,
      },
      width: "100%",
      position: "relative",
    },
    groupLogoImg: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    groupLogoOverlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      top: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: 19,
      backgroundImage:
        "linear-gradient(rgba(250, 252 ,251, 0.02), rgba(4, 97, 64, 0.98))",
    },
    groupInfo: {
      display: "flex",
      gap: 10,
      fontFamily: "NotoSansCJKkr",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0,
      color: "#ffffff",
      alignItems: "center",
      marginTop: theme.spacing(3),
    },
    padding16: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    paddingLeft16: {
      paddingRight: theme.spacing(1),
    },
    groupJoin: {
      width: 69,
      height: theme.spacing(3),
      borderRadius: 2,
      backgroundColor: "#212121",
      paddingLeft: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      color: "#ffffff",
    },
  };
});
export default function GroupLogoContainer(props: { data?: HomeGroup }) {
  const [{ user_id, group_id }] = useStore();
  const classes = useStyles();
  const history = useHistory();
  const [join, { loading, error }] = useMutation(insertUserGroup, {
    variables: { group_id },
  });
  function joinHandler() {
    if (user_id) {
      join();
    } else {
      history.push("/login");
    }
  }
  useLoadingEffect(loading);
  useErrorEffect(error);
  const { bg_img_url, title, created_at, users_aggregate, users = null } =
    props.data?.mx_groups_by_pk ?? {};
  const toJoinTag = users ? (
    <div>{users?.[0].status}</div>
  ) : (
    <button className={classes.groupJoin} onClick={joinHandler}>
      그룹가입
    </button>
  );
  return (
    <div className={classes.groupLogoContainer}>
      <img
        src={bg_img_url ?? publicsphere}
        alt="group logo"
        className={classes.groupLogoImg}
      />
      <div className={classes.groupLogoOverlay}>
        <Typography variant="h1">{title}</Typography>
        <div className={classes.groupInfo}>
          <div className={classes.paddingLeft16}>
            개설 {semanticDate(created_at)}
          </div>
          <div className={classes.padding16}>
            멤버 {users_aggregate?.aggregate.count ?? 0}
          </div>
          {toJoinTag}
        </div>
      </div>
    </div>
  );
}
