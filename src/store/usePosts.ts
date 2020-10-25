import React from "react";
import { firestore } from "../config/firebase";
import { Post } from "../types";
export default function usePosts({
  board_id,
  limit,
  listen = false,
  isClosed,
}: {
  board_id: string;
  listen?: boolean;
  isClosed?: boolean;
  limit?: number;
}): [Post[]] {
  const [items, setItems] = React.useState<Post[]>([]);
  React.useEffect(() => {
    const query = firestore
      .collection("posts")
      .where("board_id", "==", board_id)
      .orderBy("created_at", "desc");

    if (isClosed !== undefined) {
      query.where("is_closed", "==", isClosed);
    }
    if (limit !== undefined) {
      query.limit(limit);
    }
    if (listen) {
      return query.onSnapshot((snapshot) => {
        const items = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...(doc.data() as any) } as Post)
        );
        setItems(items);
      });
    } else {
      query.get().then((snapshot) => {
        const items = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...(doc.data() as any) } as Post)
        );
        setItems(items);
      });
    }
  }, [board_id, listen, isClosed, limit]);
  return [items];
}
