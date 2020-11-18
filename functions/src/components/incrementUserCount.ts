import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { COUNTER_DOC, PARAM_COLLECTION } from "../env";
export default functions
  .region("asia-northeast3")
  .firestore.document("groups/{group_id}/users/{user_id}")
  .onCreate(async (snapshot) =>
    snapshot.ref.parent.parent
      ?.collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC)
      .set(
        {
          user_count: admin.firestore.FieldValue.increment(1),
          updated_at: new Date(),
        },
        { merge: true }
      )
  );
