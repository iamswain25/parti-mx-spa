import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Avatar } from "@material-ui/core";
import useGroups from "../store/useGroups";
export default function GroupSearchList(props: {
  keyword: string;
  clickHandler: any;
}) {
  const { clickHandler } = props;
  const [groups] = useGroups();
  if (!groups?.length) {
    return <ListItem>검색된 그룹이 없습니다.</ListItem>;
  }
  return (
    <>
      {groups.map((group: any) => (
        <ListItem key={group.id} button onClick={() => clickHandler(group.id)}>
          <ListItemIcon>
            <Avatar
              variant="square"
              src={group.bg_img}
              children={group.title.substr(0, 1)}
            />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ variant: "h4" }}
            primary={group?.title}
          />
        </ListItem>
      ))}
    </>
  );
}
