import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { subscribeGroupsByUserId } from "../graphql/subscription";
import { useSubscription } from "@apollo/client";
import { useStore } from "../store/store";
import { UserGroup, Whoami } from "../types";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import {
  Avatar,
  makeStyles,
  Theme,
  List,
  Typography,
  Divider,
} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}));
export default function MyGroupList(props: {
  clickHandler: (group_id: number) => void;
}) {
  const { clickHandler } = props;
  const classes = useStyles();
  const [{ user_id, group_id }] = useStore();
  const { loading, data, error } = useSubscription<Whoami>(
    subscribeGroupsByUserId,
    {
      variables: { user_id },
    }
  );
  useLoadingEffect(loading);
  useErrorEffect(error);
  if (loading) {
    return null;
  }
  const me = data?.mx_users_by_pk;
  const ugs = data?.mx_users_by_pk?.groups;
  if (!(me && ugs)) {
    return null;
  }

  const list =
    ugs.length > 0 ? (
      ugs.map((ug: UserGroup, i: number) => (
        <ListItem
          key={i}
          button
          onClick={() => clickHandler(ug.group_id)}
          selected={ug.group_id === group_id}
        >
          <ListItemIcon>
            <Avatar
              variant="square"
              src={ug.group.bg_img_url}
              children={ug.group.title.substr(0, 1)}
            />
          </ListItemIcon>
          <ListItemText primary={ug.group?.title} />
        </ListItem>
      ))
    ) : (
      <div style={{ flex: 1, fontSize: 16, color: "#39caba" }}>
        아직, 가입된 그룹이 없나요?{"\n"}
        그룹명을 검색하거나 {"\n"}
        그룹 참여 링크를 다시 눌러주세요.{"\n"}
      </div>
    );

  return (
    <List>
      <Typography variant="h2">
        <div className={classes.title}>
          <span>믹스 그룹</span>
          <Avatar src={me.photo_url} children={me.name.substr(0, 1)} />
        </div>
      </Typography>
      <Divider />
      {list}
    </List>
  );
}
