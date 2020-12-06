import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onDelete(async (snapshot) => {
    const { group_id, board_id, is_closed } = snapshot.data();
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
    await boardRef.set(set, { merge: true });
  });
