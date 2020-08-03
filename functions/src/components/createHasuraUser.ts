// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { gql } from "apollo-boost";
import { client } from "./ApolloClient";
export default async function createHasuraUser(
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
  return res.data?.insert_mx_users_one?.id as number;
}
