import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";
export const ALGOLIA_ID = functions.config().algolia.app_id;
export const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
export const ALGOLIA_INDEX_NAME = "green-newdeal";
export const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
export const index = client.initIndex(ALGOLIA_INDEX_NAME);
export default async function postAlgolia(
  change: functions.Change<functions.firestore.DocumentSnapshot>,
) {
  const documentId = change.after.id;
  if (change.after.exists) {
    const data = change.after.data();
    if (!data) return new Error("no data");
    // Add an 'objectID' field which Algolia requires
    data.objectID = documentId;
    delete data.html;
    return index.saveObject(data);
  } else {
    return index.deleteObject(documentId);
  }
}
