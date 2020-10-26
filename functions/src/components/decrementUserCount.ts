import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
export default functions
  .region("asia-northeast3")
  .firestore.document("groups/{group_id}/users/{user_id}")
  .onDelete(async (snapshot) =>
    snapshot.ref.parent.parent?.update({
      user_count: admin.firestore.FieldValue.increment(-1),
      updated_at: new Date(),
    })
  );
