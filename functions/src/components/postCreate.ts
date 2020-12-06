import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const firestore = admin.firestore();
export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onCreate(async (snapshot, context) => {
    const { group_id, board_id } = snapshot.data();
    const board = firestore
      .collection("groups")
      .doc(group_id)
      .collection("boards")
      .doc(board_id);
    return Promise.all([
      board?.set(
        {
          count_open: admin.firestore.FieldValue.increment(1),
          count_post: admin.firestore.FieldValue.increment(1),
          last_posted_at: new Date(),
        },
        { merge: true }
      ),
      /** 기본 세팅  */
      snapshot.ref.set(
        {
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          last_commented_at: null,
          last_liked_at: null,
          created_by: context.auth?.uid,
          updated_by: context.auth?.uid,
          is_closed: false,
        },
        { merge: true }
      ),
    ]);
  });
