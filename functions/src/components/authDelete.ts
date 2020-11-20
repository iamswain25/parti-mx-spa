import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
type UserRecord = admin.auth.UserRecord;
const firestore = admin.firestore();
export default functions
  .region("asia-northeast3")
  .auth.user()
  .onDelete(async (user: UserRecord) => {
    // await firestore
    //   .collection("users")
    //   .doc(user.uid)
    //   .update({ deleted_at: new Date() });
    if (user.email) {
      await firestore.doc(`groups/home/users/${user.uid}`).delete();
    }
  });
