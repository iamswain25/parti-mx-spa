import * as functions from "firebase-functions";
// export const HASURA_GRAPHQL_ENGINE_URL = process.env.hasura.url;
// export const ADMIN_SECRET = process.env.hasura.secret;
interface Config extends functions.config.Config {
  hasura: {
    url: string;
    secret: string;
  };
  gmail: {
    user: string;
    pass: string;
    clientid: string;
    clientsecret: string;
    refreshtoken: string;
    accesstoken: string;
  };
}
const config = functions.config() as Config;
export const HASURA = config.hasura;
export const GMAIL = config.gmail;
export const PARAM_COLLECTION = "$PARAMS$";
export const COUNTER_DOC = "counters";
