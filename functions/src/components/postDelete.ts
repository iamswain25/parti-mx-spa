import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { index as algoliaIndex } from "./postAlgolia";
export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onDelete(async snapshot => {
    const { group_id, board_id, is_closed } = snapshot.data();
    const post_id = snapshot.id;
    const boardRef = admin
      .firestore()
      .collection("groups")
      .doc(group_id)
      .collection("boards")
      .doc(board_id);

    const set = {
      [is_closed
        ? "count_closed"
        : "count_open"]: admin.firestore.FieldValue.increment(-1),
      count_post: admin.firestore.FieldValue.increment(-1),
    };
    return Promise.all([
      boardRef.set(set, { merge: true }),
      algoliaIndex.deleteObject(post_id),
    ]);
  });
