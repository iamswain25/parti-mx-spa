import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { subscribeGroupsByUserId } from "../graphql/subscription";
import { useSubscription } from "@apollo/client";
import { useStore } from "../store/store";
import { UserGroup } from "../types";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";

export default function MyGroupList(props: {
  clickHandler: (group_id: number) => void;
}) {
  const { clickHandler } = props;
  const [{ user_id }] = useStore();
  const { loading, data, error } = useSubscription(subscribeGroupsByUserId, {
    variables: { user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  if (loading) {
    return null;
  }

  return data?.mx_users_group?.length > 0 ? (
    data.mx_users_group.map((usersGroup: UserGroup, i: number) => (
      <ListItem
        key={i}
        button
        onClick={() => clickHandler(usersGroup.group_id)}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={usersGroup.group?.title} />
      </ListItem>
    ))
  ) : (
    <div style={{ flex: 1, fontSize: 16, color: "#39caba" }}>
      아직, 가입된 그룹이 없나요?{"\n"}
      그룹명을 검색하거나 {"\n"}
      그룹 참여 링크를 다시 눌러주세요.{"\n"}
    </div>
  );
}
