import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
  List,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { useDebounce } from "use-debounce";
import { useQuery } from "@apollo/client";
import { searchMembers } from "../graphql/query";
import { useStore } from "../store/store";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link, Redirect } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import AvatarNameEmail from "./AvatarNameEmail";
import UserGroupStatus from "./UserGroupStatus";
import useSetStatus from "./useSetStatus";
import { UserGroup } from "../types";
import { useGlobalState, keys } from "../store/useGlobalState";
const useStyles = makeStyles((theme) => ({
  top: {
    height: theme.mixins.toolbar.minHeight,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflow: "hidden",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar,
    "& a": {
      color: "inherit",
    },
  },
  list: {
    width: "100%",
    "& li": {
      justifyContent: "space-between",
    },
  },
}));
interface UserGroups {
  mx_users_group: UserGroup[];
}
export default function MemberSetting() {
  const classes = useStyles();
  const [{ group_id }] = useStore();
  const [keyword, setKeyword] = React.useState("");
  const [debouncedKeyword] = useDebounce(`%${keyword}%`, 500);
  const [status] = useGlobalState(keys.PERMISSION);
  const { data, loading, error } = useQuery<UserGroups>(searchMembers, {
    variables: { keyword: debouncedKeyword, group_id },
    fetchPolicy: "network-only",
  });
  const setStatus = useSetStatus();
  useLoadingEffect(loading);
  useErrorEffect(error);
  if (loading) {
    return null;
  }
  if (status !== "organizer") {
    return <Redirect to="/" />;
  }
  const list = data?.mx_users_group;

  return (
    <Container component="main">
      <Grid
        container
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
        className={classes.top}
      >
        <Link to={`/home?group_id=${group_id}`}>
          <ChevronLeftIcon />
        </Link>
        <Typography variant="h3" color="textPrimary">
          회원 관리
        </Typography>
        <Link to="/members/new">
          <PersonAddIcon />
        </Link>
      </Grid>
      <Typography>
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
        <List className={classes.list}>
          {list?.map((l, i) => {
            return (
              <ListItem key={i}>
                <AvatarNameEmail user={l.user} />
                <UserGroupStatus userGroup={l} update={setStatus} />
              </ListItem>
            );
          })}
        </List>
      </Typography>
    </Container>
  );
}
