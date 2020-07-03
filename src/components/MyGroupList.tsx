import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { subscribeGroupsByUserId } from "../graphql/subscription";
import { useSubscription } from "@apollo/client";
import { useStore } from "../store/store";
import { UserGroup } from "../types";
import { useHistory } from "react-router-dom";

export default function MyGroupList() {
  const history = useHistory();
  const [{ user_id }, dispatch] = useStore();
  const { loading, data } = useSubscription(subscribeGroupsByUserId, {
    variables: { user_id },
  });
  function handeClick(group_id: number) {
    dispatch({ type: "SET_GROUP", group_id });
    history.push("/");
  }

  return !loading && data && data.mx_users_group.length > 0 ? (
    data.mx_users_group.map((usersGroup: UserGroup, i: number) => (
      <ListItem key={i} button onClick={() => handeClick(usersGroup.group_id)}>
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
