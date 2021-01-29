import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { useGroupId } from "../store/useGlobalState";
import AvatarNameEmail from "./AvatarNameEmail";
import UserGroupStatus from "./UserGroupStatus";
import { GroupUser } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import { firestore } from "../config/firebase";
import firebase from "firebase";
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
let lastVisible: firebase.firestore.DocumentData | null = null;
const LIMIT = 20;
export default function Members() {
  const classes = useStyles();
  const [groupId] = useGroupId();
  const [items, setItems] = React.useState<GroupUser[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  async function fetchData(isSearching = false) {
    let ref = firestore
      .collection("groups")
      .doc(groupId)
      .collection("users")
      .orderBy("created_at")
      .limit(LIMIT);
    if (lastVisible && !isSearching) {
      ref = ref.startAfter(lastVisible);
    }
    const snapshot = await ref.get();
    lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const users = snapshot.docs.map(
      (u) => ({ id: u.id, ...(u.data() as any) } as GroupUser)
    );
    if (isSearching) {
      setItems(users);
    } else if (!users?.length) {
      setHasMore(false);
    } else {
      setItems([...items, ...users]);
    }
  }

  React.useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main">
      <h2>회원 관리</h2>
      <Typography>
        <List className={classes.list}>
          <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>여기가 끝입니다.</b>
              </p>
            }
          >
            {items?.length
              ? items?.map((item, i) => {
                  return (
                    <ListItem key={item.id}>
                      <AvatarNameEmail user_id={item.id} />
                      <UserGroupStatus user={item} />
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
