import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
  List,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { useDebouncedCallback, useDebounce } from "use-debounce";
import { useApolloClient } from "@apollo/client";
import { searchMembers } from "../graphql/query";
import { useStore } from "../store/store";
import { Link, Redirect } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import AvatarNameEmail from "./AvatarNameEmail";
import UserGroupStatus from "./UserGroupStatus";
import useSetStatus from "./useSetStatus";
import { UserGroup } from "../types";
import { useGlobalState, keys } from "../store/useGlobalState";
import UserGroupAdmit from "./UserGroupAdmit";
import HeaderBack from "./HeaderBack";
import InfiniteScroll from "react-infinite-scroll-component";
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
const LIMIT = 20;
export default function MemberSetting() {
  const classes = useStyles();
  const [{ group_id }] = useStore();
  const [keyword, setKeyword] = React.useState("");
  const [items, setItems] = React.useState<UserGroup[]>([]);
  const [debouncedKeyword] = useDebounce(`%${keyword}%`, 200);
  const [status] = useGlobalState(keys.PERMISSION);
  const client = useApolloClient();
  const setStatus = useSetStatus(fetchData);

  React.useEffect(() => {
    if (debouncedKeyword.length > 2) {
      fetchData(true);
    } else {
      fetchData();
    }
  }, [debouncedKeyword]);
  if (status !== "organizer") {
    return <Redirect to="/" />;
  }
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }
  async function fetchData(isSearching = false) {
    const usergroups = await client.query<UserGroups>({
      query: searchMembers,
      variables: {
        keyword: debouncedKeyword,
        group_id,
        limit: LIMIT,
        offset: isSearching ? 0 : items.length,
      },
      fetchPolicy: "network-only",
    });
    console.log(usergroups.data?.mx_users_group);
    if (isSearching) {
      setItems(usergroups.data?.mx_users_group || []);
    } else {
      setItems([...items, ...(usergroups.data?.mx_users_group || [])]);
    }
  }

  return (
    <Container component="main">
      <HeaderBack
        title="회원 관리"
        right={
          <Link to="/members/new">
            <PersonAddIcon />
          </Link>
        }
      />
      <Typography>
        <OutlinedInput
          fullWidth
          value={keyword}
          onChange={changeHandler}
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
          <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>여기가 끝입니다.</b>
              </p>
            }
          >
            {items?.length
              ? items?.map((l, i) => {
                  return (
                    <ListItem key={l.user_id}>
                      <AvatarNameEmail user={l.user} />
                      {l.status === "requested" ? (
                        <UserGroupAdmit userGroup={l} update={setStatus} />
                      ) : (
                        <UserGroupStatus userGroup={l} update={setStatus} />
                      )}
                    </ListItem>
                  );
                })
              : ["검색 결과가 없습니다."]}
          </InfiniteScroll>
        </List>
      </Typography>
    </Container>
  );
}
