import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import injectCustomClaim from "./injectCustomClaim";
const auth = admin.auth();
export default functions
  .region("asia-northeast1")
  .https.onCall(async ({ emails, groups }) => {
    return Promise.all(
      emails.map(async (email: string) =>
        auth
          .createUser({
            email,
            password: "123456",
            disabled: true,
          })
          .then(async (user) => {
            await injectCustomClaim(user, groups);
            return { email, success: true };
          })
          .catch((error) => ({ email, success: false, error }))
      )
    );
  });
