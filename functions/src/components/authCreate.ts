import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const firestore = admin.firestore();
export default functions
  .region("asia-northeast3")
  .auth.user()
  .onCreate(async (user: admin.auth.UserRecord) => {
    const { photoURL, displayName, email } = user;
    const promiseUsers = firestore.collection("users").doc(user.uid).set({
      created_at: new Date(),
      email,
      name: displayName,
      photo_url: photoURL,
      deleted_at: null,
    });
    return Promise.all([promiseUsers]);
  });
