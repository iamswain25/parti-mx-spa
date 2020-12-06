import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

async function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}
export default functions
  .region("asia-northeast3")
  .firestore.document(
    "posts/{post_id}/candidates/{candidate_id}/users/{user_id}"
  )
  .onCreate(async (snapshot, context) => {
    const candidate = snapshot.ref.parent.parent;
    const post = candidate?.parent.parent;

    await delay(500); //0.5초 뒤에 카운트
    /**
     * isMultiple === false 일 시 deletion과 충돌하여 count_max_vote 계산이 어글어지는 것을 방지  */
    const [res1, res2] = await Promise.all([post?.get(), candidate?.get()]);
    const count_max_vote = res1?.get("count_max_vote");
    const count_vote = res2?.get("count_vote");

    const req1 = candidate?.set(
      { count_vote: admin.firestore.FieldValue.increment(1) },
      { merge: true }
    );
    const set: any = {
      count_total_vote: admin.firestore.FieldValue.increment(1),
    };
    if (count_max_vote === count_vote) {
      set.count_max_vote = admin.firestore.FieldValue.increment(1);
    }
    const req2 = post?.set(set, { merge: true });
    return Promise.all([req1, req2]);
  });
