import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export default functions
  .region("asia-northeast3")
  .firestore.document("groups/{group_id}/users/{user_id}")
  .onCreate(async (snapshot) => {
    const doc = snapshot.ref.parent.parent;
    return doc?.set(
      {
        count_user: admin.firestore.FieldValue.increment(1),
      },
      { merge: true }
    );
  });
