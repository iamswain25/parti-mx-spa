// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HASURA_GRAPHQL_ENGINE_URL, ADMIN_SECRET } from "../env";
import fetch from "cross-fetch";
import ApolloClient, { gql } from "apollo-boost";
const client = new ApolloClient({
  fetch,
  uri: HASURA_GRAPHQL_ENGINE_URL,
  headers: {
    "x-hasura-admin-secret": ADMIN_SECRET,
    "x-hasura-use-backend-only-permissions": "true",
  },
});
export default async function injectCustomClaim(
  user: admin.auth.UserRecord,
  groups = [{ group_id: 100, status: "requested" }]
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
