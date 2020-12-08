import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });
export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onCreate(async (snapshot) => {
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
          /**
           * This field is only populated for Realtime Database triggers and Callable functions.
           * https://firebase.google.com/docs/reference/functions/cloud_functions_.eventcontext?hl=ko#optional-auth
           * created_by: context.auth?.uid,
           * updated_by: context.auth?.uid,
           */
          is_closed: false,
        },
        { merge: true }
      ),
    ]);
  });
