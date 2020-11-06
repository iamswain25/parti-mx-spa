import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
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
      .doc(board_id);
    return boardRef.set(
      { count_open: admin.firestore.FieldValue.increment(1) },
      { merge: true }
    );
  });
