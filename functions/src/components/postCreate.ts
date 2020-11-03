import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { sendMail } from "./email";
const firestore = admin.firestore();
export default functions
  .region("asia-northeast3")
  .firestore.document("posts/{post_id}")
  .onCreate(async (snapshot) => {
    const { group_id, board_id, title, body, id, name } = snapshot.data();
    const boardRef = firestore
      .collection("groups")
      .doc(group_id)
      .collection("boards")
      .doc(board_id);
    await boardRef.set(
      { count_open: admin.firestore.FieldValue.increment(1) },
      { merge: true }
    );
    if (group_id !== "home") {
      return;
    }
    const info = await sendMail({
      subject: "[믹스 Sharenting] " + title,
      text:
        "발신자: " +
        name +
        "\n\n내용:\n" +
        body +
        "\n\nhttps://sharenting.sc.or.kr/post/" +
        id,
    });
    if (info) {
      return firestore
        .collection("groups")
        .doc(group_id)
        .collection("sent-emails")
        .doc(info.messageId)
        .set(info);
    }
    return;
  });
