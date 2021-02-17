import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export default functions
  .region("asia-northeast3")
  .firestore.document("groups/{group_id}/boards/{board_id}")
  .onDelete(async (snapshot, context) => {
    const { group_id, board_id } = context.params;
    const posts = await admin
      .firestore()
      .collection("posts")
      .where("group_id", "==", group_id)
      .where("board_id", "==", board_id)
      .get();
    return Promise.all(
      posts.docs.map(docRef => {
        docRef.ref.delete();
      }),
    );
  });
