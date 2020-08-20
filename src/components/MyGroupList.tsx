import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { queryGroupsByUserId } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { useStore } from "../store/store";
import { UserGroup, Whoami, Group } from "../types";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
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
import { useHistory, Link } from "react-router-dom";
import GroupSearchList from "./GroupSearchList";
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
  clickHandler: (group_id?: number) => void;
}) {
  const { clickHandler } = props;
  const classes = useStyles();
  const [{ user_id, group_id }] = useStore();
  const history = useHistory();
  const { loading, data, error } = useQuery<Whoami>(queryGroupsByUserId, {
    variables: { user_id },
  });
  const [keyword, setKeyword] = React.useState("");
  useLoadingEffect(loading);
  useErrorEffect(error);
  if (loading) {
    return null;
  }
  const me = data?.mx_users_by_pk;
  const ugs = data?.mx_users_by_pk?.groups;
  const rest = data?.mx_groups?.slice();
  if (!(me && ugs)) {
    return null;
  }
  const list = [];
  list.push(
    ...ugs?.map((ug: UserGroup, i: number) => {
      const groupId = ug.group_id;
      const ind = rest?.findIndex((g) => g.id === groupId);
      if (typeof ind === "number" && ind > -1) {
        rest?.splice(ind, 1);
      }
      return (
        <ListItem
          key={`group${i}`}
          button
          onClick={() => clickHandler(groupId)}
          selected={groupId === group_id}
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
      );
    })
  );
  list.push(<Divider key="divider" />);
  list.push(<ListItem key="label">아래는 가입하지 않은 그룹입니다</ListItem>);
  list.push(
    rest?.map((g: Group, i: number) => (
      <ListItem
        key={`rest${i}`}
        button
        onClick={() => clickHandler(g.id)}
        selected={g.id === group_id}
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
    ))
  );

  return (
    <>
      <Typography variant="h2">
        <div className={classes.title}>
          <span>믹스 그룹</span>
          <Link to="/profile" onClick={() => clickHandler()}>
            <Avatar src={me.photo_url} children={me.name.substr(0, 1)} />
          </Link>
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
          {me.email.indexOf("@parti.") > -1 && (
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
