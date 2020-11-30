import React from "react";
import { firestore } from "../config/firebase";
import { Post } from "../types";
export default function usePosts({
  board_id,
  limit,
  tags,
  listen = false,
  isClosed,
  where,
  orderBy = ["created_at", "desc"],
}: {
  board_id: string;
  listen?: boolean;
  tags?: string[];
  where?: [
    fieldPath: string | firebase.firestore.FieldPath,
    opStr: firebase.firestore.WhereFilterOp,
    value: any
  ];
  orderBy?: [string, "desc" | "asc"];
  isClosed?: boolean;
  limit?: number;
}): [Post[] | undefined] {
  const [items, setItems] = React.useState<Post[] | undefined>(undefined);
  React.useEffect(() => {
    let query = firestore.collection("posts").where("board_id", "==", board_id);

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
    if (orderBy) {
      query = query.orderBy(...orderBy);
    }
    if (limit !== undefined) {
      query = query.limit(limit);
    }
    if (listen) {
      return query.onSnapshot(
        (snapshot) => {
          const items = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...(doc.data() as any) } as Post)
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
            (doc) => ({ id: doc.id, ...(doc.data() as any) } as Post)
          );
          setItems(items);
        })
        .catch((error) => {
          console.warn("usePosts", error);
        });
    }
  }, [board_id, listen, isClosed, limit, tags, orderBy, where]);
  return [items];
}
