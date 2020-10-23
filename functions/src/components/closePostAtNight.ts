import * as functions from "firebase-functions";
import { gql } from "apollo-boost";
import { client } from "./ApolloClient";
import { differenceInDays, isAfter } from "date-fns";
export default functions
  .region("asia-northeast3")
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
            title
            metadata
            created_at
            created_by
            updated_by
            board_id
          }

          events: mx_posts(
            where: {
              closed_at: { _is_null: true }
              board: { type: { _in: ["event"] } }
              _and: [{ metadata: { _has_key: "event_date" } }]
            }
          ) {
            id
            title
            metadata
            created_by
            updated_by
            board_id
          }
        }
      `,
    });
    let objects: any[] = [];
    const arrPosts = suggestionsAndPosts
      ?.filter((e: any) => {
        const now = new Date();
        const createdDate = new Date(e.created_at);
        try {
          const days = Number(e.metadata.closingMethod.replace("days", ""));
          const isClosingTime = differenceInDays(now, createdDate) >= days;
          return isClosingTime;
        } catch (error) {
          return true;
        }
      })
      ?.map((e: any) => {
        const { id, created_by, updated_by, title, board_id } = e;
        return {
          id,
          closed_at: "now()",
          created_by,
          updated_by,
          title,
          board_id,
        };
      });
    const arrEvent = events
      ?.filter((e: any) => {
        const event_date = new Date(e.metadata.event_date);
        const now = new Date();
        const isClosingTime = isAfter(now, event_date);
        return isClosingTime;
      })
      ?.map((e: any) => {
        const { id, created_by, updated_by, title, board_id } = e;
        return {
          id,
          closed_at: "now()",
          created_by,
          updated_by,
          title,
          board_id,
        };
      });

    objects = objects.concat(arrPosts);
    objects = objects.concat(arrEvent);
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
