import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useQuery } from "@apollo/client";
import { searchGroups } from "../graphql/query";
import { Avatar } from "@material-ui/core";
export default function GroupSearchList(props: {
  keyword: string;
  clickHandler: any;
}) {
  const { keyword, clickHandler } = props;
  const { data } = useQuery(searchGroups, {
    variables: { searchKeyword: `%${keyword}%` },
    fetchPolicy: "network-only",
  });
  const groups = data?.mx_groups;
  if (!groups?.length) {
    return <ListItem> 검색된 그룹이 없습니다.</ListItem>;
  }
  return data.mx_groups.map((group: any, i: number) => (
    <ListItem key={i} button onClick={() => clickHandler(group.id)}>
      <ListItemIcon>
        <Avatar
          variant="square"
          src={group.bg_img_url}
          children={group.title.substr(0, 1)}
        />
      </ListItemIcon>
      <ListItemText primary={group?.title} />
    </ListItem>
  ));
}
