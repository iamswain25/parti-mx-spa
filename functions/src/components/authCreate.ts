import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const firestore = admin.firestore();
export default functions
  .region("asia-northeast3")
  .auth.user()
  .onCreate(async (user: admin.auth.UserRecord) => {
    const { photoURL, displayName } = user;
    firestore
      .collection("users")
      .doc(user.uid)
      .set({ created_at: new Date(), name: displayName, photo_url: photoURL });
  });
