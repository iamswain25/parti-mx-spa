import * as functions from "firebase-functions";
import { gql } from "apollo-boost";
import { client } from "./ApolloClient";
import { differenceInDays, isAfter } from "date-fns";
export default functions
  .region("asia-northeast1")
  .https.onRequest(async (req, res) => {
    const {
      data: { events = [], suggestionsAndPosts = [] },
    } = await client.query({
      query: gql`
        query {
          suggestionsAndPosts: mx_posts(
            where: {
              closed_at: { _is_null: true }
              board: { type: { _in: ["suggestion", "vote"] } }
              _and: [
                { metadata: { _has_key: "closingMethod" } }
                {
                  _not: { metadata: { _contains: { closingMethod: "manual" } } }
                }
              ]
            }
          ) {
            id
            metadata
            created_at
          }

          events: mx_posts(
            where: {
              closed_at: { _is_null: true }
              board: { type: { _in: ["event"] } }
              _and: [{ metadata: { _has_key: "eventDate" } }]
            }
          ) {
            id
            metadata
          }
        }
      `,
    });
    const objects: any[] = [];
    objects.concat(
      suggestionsAndPosts
        ?.filter((e: any) => {
          const now = new Date();
          const createdDate = new Date(e.created_at);
          const days = Number(e.metadata.closingMethod.replace("days", ""));
          return differenceInDays(now, createdDate) >= days;
        })
        ?.map((e: any) => {
          return { id: e.id, closed_at: "now()" };
        })
    );
    objects.concat(
      events
        ?.filter((e: any) => {
          const eventDate = new Date(e.metadata.eventDate);
          const now = new Date();
          return isAfter(eventDate, now);
        })
        ?.map((e: any) => {
          return { id: e.id, closed_at: "now()" };
        })
    );
    let affected_rows = 0;
    if (objects.length) {
      const { data } = await client.mutate<{
        posts: { affected_rows: number };
      }>({
        mutation: gql`
          mutation($objects: [mx_posts_insert_input!]!) {
            posts: insert_mx_posts(
              objects: $objects
              on_conflict: {
                constraint: posts_pkey
                update_columns: [closed_at]
              }
            ) {
              affected_rows
            }
          }
        `,
        variables: { objects },
      });
      affected_rows = data?.posts?.affected_rows || 0;
    } else {
      affected_rows = objects.length;
    }
    console.log("affected_rows: " + affected_rows);
    res.status(200).send({ affected_rows });
  });