import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { COUNTER_DOC, PARAM_COLLECTION } from "../env";
export type Counter = {
  count_like: number;
  count_comment: number;
  count_view: number;
};
export interface VoteCounter extends Counter {
  count_total_vote: number;
  count_max_vote: number;
}
export default functions
  .region("asia-northeast3")
  .firestore.document(
    "posts/{post_id}/candidates/{candidate_id}/users/{user_id}"
  )
  .onDelete(async (snapshot, context) => {
    const { user_id } = context.params;
    const candidateRef = snapshot.ref.parent.parent;
    const postRef = candidateRef?.parent.parent;
    const postLikeRef = postRef?.collection("likes").doc(user_id);
    const postCounterRef = postRef
      ?.collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC);
    const candidateCounterRef = candidateRef
      ?.collection(PARAM_COLLECTION)
      .doc(COUNTER_DOC);
    const post = await postRef?.get();
    const { isMultiple = true } = post?.get("metadata") || {};
    const count_max_vote = (await postCounterRef?.get())?.get("count_max_vote");
    const count_vote = (await candidateCounterRef?.get())?.get("count_vote");
    if (!isMultiple) {
      await postLikeRef?.delete();
      await candidateCounterRef?.set(
        { count_vote: admin.firestore.FieldValue.increment(-1) },
        { merge: true }
      );
    }
    if (count_max_vote === count_vote) {
      postCounterRef?.set(
        {
          count_max_vote: admin.firestore.FieldValue.increment(-1),
          count_total_vote: admin.firestore.FieldValue.increment(-1),
        },
        { merge: true }
      );
    } else {
      postCounterRef?.set(
        { count_total_vote: admin.firestore.FieldValue.increment(-1) },
        { merge: true }
      );
    }
  });

//  const { post_id, candidate_id, user_id } = context.params;
//  const postRef = firestore.doc(`posts/${post_id}`);
//  const candidateRef = postRef.collection("candidates").doc(candidate_id);
//  const candidateCounterRef  = candidateRef
//    .collection(PARAM_COLLECTION)
//    .doc(COUNTER_DOC) ;
