import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { semanticDate } from "../helpers/datefns";
import { Link } from "react-router-dom";
import MenuGroup from "./MenuGroup";
import { useCurrentUser, useRole } from "../store/useGlobalState";
import useGroupJoin from "./useGroupJoin";
import { permissionLabelByValue } from "../helpers/options";
import { Group, Role } from "../types";
import { LinearProgress } from "@material-ui/core";
const useStyles = makeStyles((theme) => {
  return {
    groupInfo: {
      position: "absolute",
      top: 0,
      right: 0,
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
export default function InfoGroup({
  group,
  role,
}: {
  group: Group;
  role?: Role;
}) {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const joinHandler = useGroupJoin();
  const { created_at } = group;
  return (
    <div className={classes.groupInfo}>
      <span>개설 {semanticDate(created_at)}</span>
      {role === undefined ? (
        <LinearProgress />
      ) : (
        <Link to="/profile">
          {currentUser?.displayName}({permissionLabelByValue(role)})
        </Link>
      )}
      {role === "anonymous" && (
        <button className={classes.groupJoin} onClick={joinHandler}>
          그룹 가입
        </button>
      )}
      <MenuGroup group={group} />
    </div>
  );
}
