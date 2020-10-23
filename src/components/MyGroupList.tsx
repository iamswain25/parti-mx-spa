import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useGroupId from "../store/useGroupId";
import { UserGroup, Whoami, Group } from "../types";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import {
  Avatar,
  makeStyles,
  Theme,
  List,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import GroupSearchList from "./GroupSearchList";
import MenuProfile from "./MenuProfile";
import useGroups from "../store/useGroups";
import useAuth from "../store/useAuth";
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  last: {
    flex: 1,
    padding: theme.spacing(2),
    whiteSpace: "break-spaces",
    textAlign: "center",
  },
}));
export default function MyGroupList(props: {
  clickHandler: (group_id?: string) => void;
}) {
  const { clickHandler } = props;
  const [groupId] = useGroupId();
  const classes = useStyles();
  const history = useHistory();
  const [keyword, setKeyword] = React.useState("");
  const [groups] = useGroups(true);
  const [user] = useAuth();
  let list = [];
  list.push(
    ...groups?.map((g: Group, i: number) => {
      return (
        <ListItem
          key={`group${i}`}
          button
          onClick={() => clickHandler(g.id)}
          selected={groupId === g.id}
        >
          <ListItemIcon>
            <Avatar
              variant="square"
              src={g.bg_img_url}
              children={g.title.substr(0, 1)}
            />
          </ListItemIcon>
          <ListItemText primary={g.title} />
        </ListItem>
      );
    })
  );
  // list.push(<Divider key="divider" />);
  // list.push(<ListItem key="label">아래는 가입하지 않은 그룹입니다</ListItem>);
  // list.push(
  //   rest?.map((g: Group, i: number) => (
  //     <ListItem
  //       key={`rest${i}`}
  //       button
  //       onClick={() => clickHandler(g.id)}
  //       selected={g.id === group_id}
  //     >
  //       <ListItemIcon>
  //         <Avatar
  //           variant="square"
  //           src={g.bg_img_url}
  //           children={g.title.substr(0, 1)}
  //         />
  //       </ListItemIcon>
  //       <ListItemText primary={g.title} />
  //     </ListItem>
  //   ))
  // );

  return (
    <>
      <Typography variant="h2">
        <div className={classes.title}>
          <span>믹스 그룹</span>
          <MenuProfile />
        </div>
      </Typography>
      <Typography variant="h4">
        <List>
          <ListItem>
            <OutlinedInput
              fullWidth
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={
                keyword ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setKeyword("")}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
            />
          </ListItem>
          {keyword ? (
            <GroupSearchList keyword={keyword} clickHandler={clickHandler} />
          ) : (
            list
          )}
          {user?.email?.includes("@parti.") && (
            <ListItem button onClick={() => history.push("/group/new")}>
              <ListItemIcon>
                <Avatar variant="square" children={<AddIcon />} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: "h4" }}
                primary="그룹 만들기"
              />
            </ListItem>
          )}
          {!list && (
            <div className={classes.last}>
              아직, 가입된 그룹이 없나요?{"\n"}
              그룹명을 검색하거나 {"\n"}
              그룹 참여 링크를 다시 눌러주세요.{"\n"}
            </div>
          )}
        </List>
      </Typography>
    </>
  );
}
