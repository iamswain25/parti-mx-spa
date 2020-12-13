import * as functions from "firebase-functions";
import postTags from "./postTags";
import postAlgolia from "./postAlgolia";

export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onWrite(async (change) => {
    const promiseTags = postTags(change);
    const promiseAlgolia = postAlgolia(change);
    return Promise.all([
      promiseTags,
      promiseAlgolia,
      /** 기본 세팅  */
    ]);
  });
