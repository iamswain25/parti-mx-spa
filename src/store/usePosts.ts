import React from "react";
import { firestore } from "../config/firebase";
import { Post } from "../types";
export default function usePosts({
  board_id,
  limit,
  tags,
  listen = false,
  isClosed,
}: {
  board_id: string;
  listen?: boolean;
  tags?: string[];
  isClosed?: boolean;
  limit?: number;
}): [Post[]] {
  const [items, setItems] = React.useState<Post[]>([]);
  React.useEffect(() => {
    let query = firestore
      .collection("posts")
      .where("board_id", "==", board_id)
      .orderBy("created_at", "desc");
    // if (tags && tags.length) {
    //   query = query.where("tag", "array-contains-any", tags);
    // }
    // if (tags && tags.length) {
    //   for (const tag in tags) {
    //     query = query.where("tag_map." + tag, "==", true);
    //   }
    // }
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
  }, [board_id, listen, isClosed, limit, tags]);
  return [items];
}
