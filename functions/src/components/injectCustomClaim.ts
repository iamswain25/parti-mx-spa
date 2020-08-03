// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
export default async function injectCustomClaim(
  user: admin.auth.UserRecord,
  hasura_user_id: number
) {
  let customClaims;
  if (user.email && user.email.indexOf("@parti.") !== -1) {
    customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-user-id": String(hasura_user_id),
      },
    };
  } else {
    customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-user-id": String(hasura_user_id),
      },
    };
  }
  // Set custom user claims on this newly created user.
  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => hasura_user_id)
    .catch(console.error);
}
