import { HASURA_GRAPHQL_ENGINE_URL, ADMIN_SECRET } from "../env";
import fetch from "cross-fetch";
import ApolloClient from "apollo-boost";
export const client = new ApolloClient({
  fetch,
  uri: HASURA_GRAPHQL_ENGINE_URL,
  headers: {
    "x-hasura-admin-secret": ADMIN_SECRET,
    "x-hasura-use-backend-only-permissions": "true",
  },
});
