import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { COUNTER_DOC, PARAM_COLLECTION } from "../env";
const firestore = admin.firestore();
export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onCreate(async (snapshot) => {
    const { group_id, board_id } = snapshot.data();
    const boardRef = firestore
      .collection("groups")
      .doc(group_id)
      .collection("boards")
      .doc(board_id)
      .collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC);
    return boardRef.set(
      {
        count_open: admin.firestore.FieldValue.increment(1),
        count_post: admin.firestore.FieldValue.increment(1),
      },
      { merge: true }
    );
  });
