import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { COUNTER_DOC, PARAM_COLLECTION } from "../env";
export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onDelete(async (snapshot) => {
    const { group_id, board_id } = snapshot.data();
    const boardRef = admin
      .firestore()
      .collection("groups")
      .doc(group_id)
      .collection("boards")
      .doc(board_id)
      .collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC);
    await boardRef.set(
      {
        count_open: admin.firestore.FieldValue.increment(-1),
        count_post: admin.firestore.FieldValue.increment(-1),
      },
      { merge: true }
    );
  });
