// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { gql } from "apollo-boost";
import { client } from "./ApolloClient";
export default async function injectCustomClaim(
  user: admin.auth.UserRecord,
  groups = [{ group_id: 5 }, { group_id: 25 }]
) {
  const { uid, email } = user;
  const variables = { uid, email, groups };
  const res = await client.mutate({
    mutation: gql`
      mutation(
        $email: String!
        $uid: String!
        $groups: [mx_users_group_insert_input!]!
      ) {
        insert_mx_users_one(
          object: {
            email: $email
            firebase_uid: $uid
            name: $email
            groups: { data: $groups }
          }
        ) {
          id
        }
      }
    `,
    variables,
  });
  const userId = res.data?.insert_mx_users_one?.id;
  let customClaims;
  if (user.email && user.email.indexOf("@parti.") !== -1) {
    customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-user-id": String(userId),
      },
    };
  } else {
    customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-user-id": String(userId),
      },
    };
  }
  // Set custom user claims on this newly created user.
  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => userId)
    .catch(console.error);
}
