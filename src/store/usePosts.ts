import React from "react";
import { firestore } from "../config/firebase";
import { Post } from "../types";
export default function usePosts<T extends Post>({
  board_id,
  limit,
  sort = 0,
  tags,
  listen = false,
  isClosed,
  where,
}: {
  board_id: string;
  listen?: boolean;
  tags?: string[];
  sort?: number;
  where?: [
    fieldPath: string | firebase.firestore.FieldPath,
    opStr: firebase.firestore.WhereFilterOp,
    value: any
  ];
  isClosed?: boolean;
  limit?: number;
}): [T[] | undefined] {
  const [items, setItems] = React.useState<T[] | undefined>(undefined);
  React.useEffect(() => {
    let query = firestore.collection("posts").where("board_id", "==", board_id);
    switch (sort) {
      case 0:
        query = query.orderBy("created_at", "asc");
        break;
      case 1:
        query = query.orderBy("created_at", "desc");
        break;
      case 2:
        query = query.orderBy("updated_at", "desc");
        break;
      case 3:
        query = query.orderBy("last_commented_at", "desc");
        break;
      case 4:
        query = query.orderBy("count_like", "desc");
        break;
      default:
        query = query.orderBy("created_at", "asc");
    }
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
        (snapshot) => {
          const items = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...(doc.data() as any) } as T)
          );
          setItems(items);
        },
        (error) => {
          console.warn("usePosts", error);
        }
      );
    } else {
      query
        .get()
        .then((snapshot) => {
          const items = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...(doc.data() as any) } as T)
          );
          setItems(items);
        })
        .catch((error) => {
          console.warn("usePosts", error);
        });
    }
  }, [board_id, listen, isClosed, limit, tags, where, sort]);
  return [items];
}
