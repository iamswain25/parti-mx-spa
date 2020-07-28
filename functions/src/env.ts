import * as functions from "firebase-functions";
interface Config extends functions.config.Config {
  hasura: {
    url: string;
    secret: string;
  };
}
const config = functions.config() as Config;
export const HASURA_GRAPHQL_ENGINE_URL = config.hasura.url;
export const ADMIN_SECRET = config.hasura.secret;
