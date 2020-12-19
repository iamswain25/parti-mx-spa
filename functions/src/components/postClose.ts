import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const firestore = admin.firestore();
export default function postClose(
  change: functions.Change<functions.firestore.DocumentSnapshot>,
) {
  const beforeClosed = change.before.get("is_closed");
  const afterClosed = change.after.get("is_closed");
  if (beforeClosed !== afterClosed) {
    const { group_id, board_id } = change.after.data() || {};
    const boardRef = firestore
      .collection("groups")
      .doc(group_id)
      .collection("boards")
      .doc(board_id);
    const set = {
      count_closed: admin.firestore.FieldValue.increment(afterClosed ? 1 : -1),
      count_open: admin.firestore.FieldValue.increment(afterClosed ? -1 : 1),
    };
    return boardRef.set(set, { merge: true });
  }
  return null;
}
