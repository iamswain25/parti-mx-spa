import * as functions from "firebase-functions";
import postClose from "./postClose";

export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onUpdate(async change => {
    const promise1 = postClose(change);
    return Promise.all([
      promise1,
      /** 기본 세팅  */
    ]);
  });
