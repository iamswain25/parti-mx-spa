import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onCreate(async (snapshot, context) => {
    const { group_id, board_id } = snapshot.data();
    const boardRef = admin
      .firestore()
      .collection("groups")
      .doc(group_id)
      .collection("boards")
      .doc(board_id);
    // const type = (await boardRef.get()).get("type");
    // await snapshot.ref.set(
    //   {
    //     count_like: 0,
    //     count_comment: 0,
    //     count_view: 0,
    //     updated_at: new Date(),
    //     created_at: new Date(),
    //     type,
    //   },
    //   { merge: true }
    // );
    await boardRef.set(
      { count_open: admin.firestore.FieldValue.increment(1) },
      { merge: true }
    );
  });
