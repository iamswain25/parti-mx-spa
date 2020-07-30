import * as functions from "firebase-functions";
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
type UserRecord = admin.auth.UserRecord;

export default functions
  .region("asia-northeast1")
  .auth.user()
  .onDelete(async (user: UserRecord) => {
    const { uid } = user;
    const variables = { uid };
    const res = await client.mutate({
      mutation: gql`
        mutation($uid: String!) {
          update_mx_users_group(
            where: { user: { firebase_uid: { _eq: $uid } } }
            _set: { status: "exit" }
          ) {
            affected_rows
          }

          update_mx_users(
            where: { firebase_uid: { _eq: $uid } }
            _set: { deleted_at: "now()" }
          ) {
            affected_rows
          }
        }
      `,
      variables,
    });
    if (res.data?.update_mx_users_group?.affected_rows > 0) {
      console.log("success");
    } else {
      console.log(
        "affected_rows: " + res.data?.update_mx_users_group?.affected_rows
      );
    }
  });
