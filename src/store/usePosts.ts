import React from "react";
import { firestore } from "../config/firebase";
import { SORT_ARRAY } from "../helpers/options";
import { Post, UsePostProps } from "../types";
export default function usePosts<T extends Post>({
  board_id,
  limit,
  sort = 0,
  tags,
  listen = false,
  isClosed,
  where,
}: UsePostProps): [T[] | undefined] {
  const [items, setItems] = React.useState<T[] | undefined>(undefined);
  React.useEffect(() => {
    let query = firestore.collection("posts").where("board_id", "==", board_id);
    query = query.orderBy(...SORT_ARRAY[sort].param);

    // if (tags && tags.length) {
    //   query = query.where("tag", "array-contains-any", tags);
    // }
    // if (tags && tags.length) {
    //   for (const tag in tags) {
    //     query = query.where("tag_map." + tag, "==", true);
    //   }
    // }

    if (where !== undefined) {
      query = query.where(...where);
    }
    if (isClosed !== undefined) {
      query = query.where("is_closed", "==", isClosed);
    }
    if (limit !== undefined) {
      query = query.limit(limit);
    }
    if (listen) {
      return query.onSnapshot(
        snapshot => {
          const items = snapshot.docs.map(
            doc => ({ id: doc.id, ...(doc.data() as any) } as T),
          );
          setItems(items);
        },
        error => {
          console.warn("usePosts", error);
        },
      );
    } else {
      query
        .get()
        .then(snapshot => {
          const items = snapshot.docs.map(
            doc => ({ id: doc.id, ...(doc.data() as any) } as T),
          );
          setItems(items);
        })
        .catch(error => {
          console.warn("usePosts", error);
        });
    }
  }, [board_id, listen, isClosed, limit, tags, where, sort]);
  return [items];
}
