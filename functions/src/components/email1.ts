import * as admin from "firebase-admin";
import { sendMail } from "./email";
const firestore = admin.firestore();
export async function email1({ group_id, title, body, id }: any) {
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
  return info;
}
