import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { semanticDate } from "../helpers/datefns";
import { Link } from "react-router-dom";
import MenuGroup from "./MenuGroup";
import { useCurrentUser } from "../store/useGlobalState";
import useGroupJoin from "./useGroupJoin";
import { permissionLabelByValue } from "../helpers/options";
import { Group, Role } from "../types";
import { LinearProgress } from "@material-ui/core";
import useUser from "../store/useUser";
const useStyles = makeStyles(theme => {
  return {
    groupInfo: {
      position: "absolute",
      top: 0,
      right: 0,
      display: "flex",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0,
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.3)",
      padding: theme.spacing(0, 2),
      [theme.breakpoints.up("md")]: {
        height: theme.spacing(6),
      },
      [theme.breakpoints.down("sm")]: {},
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
    profile: {
      padding: theme.spacing(0, 2),
    },
  };
});
export default function InfoGroup({
  group,
  role,
}: {
  group?: Group | null;
  role?: Role;
}) {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const joinHandler = useGroupJoin();
  const { created_at } = group || {};
  const [me] = useUser({ id: currentUser?.uid });
  if (!group) {
    return null;
  }
  return (
    <div className={classes.groupInfo}>
      <span>개설 {semanticDate(created_at)}</span>
      {role === undefined ? (
        <LinearProgress />
      ) : (
        <Link to="/profile" className={classes.profile}>
          {me?.name}({permissionLabelByValue(role)})
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
