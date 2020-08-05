import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import injectCustomClaim from "./injectCustomClaim";
import createHasuraUser from "./createHasuraUser";
import getHasuraUser from "./getHasuraUser";
const auth = admin.auth();
async function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}
const runtimeOpts = {
  timeoutSeconds: 300,
};
export default functions
  .region("asia-northeast3")
  .runWith(runtimeOpts)
  .https.onCall(async ({ emails, groups }) => {
    const users = await Promise.all(
      emails.map(async (email: string, i: number) => {
        await delay(i * 150);
        try {
          const user = await auth.createUser({
            email,
            password: "123456",
            disabled: true,
          });
          const userId = await createHasuraUser(user, groups);
          await injectCustomClaim(user, userId);
          return { email, success: true };
        } catch (error) {
          const user = await auth.getUserByEmail(email);
          if (user.customClaims?.["https://hasura.io/jwt/claims"]) {
            return { error, email, success: false };
          } else {
            let userId;
            userId = await getHasuraUser(user);
            if (!userId) {
              userId = await createHasuraUser(user, groups);
            }
            await injectCustomClaim(user, userId);
            await auth.updateUser(user.uid, { disabled: false });
            return { email, success: true };
          }
        }
      })
    );
    return users;
  });
