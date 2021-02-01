import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import createHasuraUser from "./createHasuraUser";
import injectCustomClaim from "./injectCustomClaim";

export default functions
  .region("asia-northeast1")
  .auth.user()
  .onCreate(async (user: admin.auth.UserRecord) => {
    if (user.disabled) {
      admin.auth().updateUser(user.uid, { disabled: false });
    } else {
      const userId = await createHasuraUser(user);
      return injectCustomClaim(user, userId);
    }
  });
