import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
export default functions
  .region("asia-northeast3")
  .firestore.document(
    "posts/{post_id}/candidates/{candidate_id}/users/{user_id}",
  )
  .onDelete(async snapshot => {
    const candidate = snapshot.ref.parent.parent;
    const post = candidate?.parent.parent;
    const req1 = candidate?.set(
      { count_vote: admin.firestore.FieldValue.increment(-1) },
      { merge: true },
    );
    const req2 = post?.set(
      {
        count_total_vote: admin.firestore.FieldValue.increment(-1),
      },
      { merge: true },
    );
    return Promise.all([req1, req2]);
  });
