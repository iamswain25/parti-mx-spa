import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useGroupId } from "../store/useGlobalState";
import { Group } from "../types";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useGroups from "../store/useGroups";
import { useCurrentUser } from "../store/useGlobalState";
import useNewGroup from "./useNewGroup";
import AvatarStorage from "./AvatarStorage";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
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
export default function MyGroupList(props: { clickHandler: () => void }) {
  const { clickHandler } = props;
  const [groupId] = useGroupId();
  const classes = useStyles();
  const newGroupHadnler = useNewGroup();
  const [keyword, setKeyword] = React.useState("");
  const [groups] = useGroups();
  const filteredGroups = React.useMemo(
    () => groups?.filter(g => g.title.includes(keyword)),
    [groups, keyword],
  );
  const [currentUser] = useCurrentUser();
  let list = [];
  if (filteredGroups?.length) {
    list.push(
      ...filteredGroups?.map((g: Group, i: number) => {
        return (
          <ListItem
            key={g.id}
            component={Link}
            to={`/${g.id}`}
            button
            onClick={clickHandler}
            selected={groupId === g.id}
          >
            <ListItemIcon>
              <AvatarStorage
                obj={g.mb_img}
                variant="square"
                children={g.title.substr(0, 1)}
              />
            </ListItemIcon>
            <ListItemText primary={g.title} />
          </ListItem>
        );
      }),
    );
  } else {
    list.push(<ListItem>검색된 그룹이 없습니다.</ListItem>);
  }

  return (
    <>
      <Typography variant="h2">
        <div className={classes.title}>
          <span>믹스 그룹</span>
          {currentUser?.email ? <LogoutButton /> : <LoginButton />}
        </div>
      </Typography>
      <Typography variant="h4">
        <List>
          <ListItem>
            <OutlinedInput
              fullWidth
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
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
          {list}
          {currentUser?.email?.includes("@parti.") && (
            <ListItem button onClick={newGroupHadnler}>
              <ListItemIcon>
                <Avatar variant="square" children={<AddIcon />} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: "h4" }}
                primary="새 그룹 만들기"
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
