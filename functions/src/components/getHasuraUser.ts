// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { gql } from "apollo-boost";
import { client } from "./ApolloClient";
export default async function getHasuraUser(user: admin.auth.UserRecord) {
  const { uid } = user;
  const variables = { uid };
  const res = await client.query({
    query: gql`
      query($uid: String!) {
        mx_users(where: { firebase_uid: { _eq: $uid } }) {
          id
        }
      }
    `,
    variables,
  });
  return res.data?.mx_users?.[0]?.id as number;
}
