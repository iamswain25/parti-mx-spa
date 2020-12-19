import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
function findAddedStringFromArray(
  before?: string[],
  after?: string[]
): string[] {
  if (!after) {
    return [];
  }
  if (!before) {
    return [...after];
  }
  const arr = [] as string[];
  after.forEach((str) => {
    if (!before.includes(str)) {
      arr.push(str);
    }
  });
  return arr;
}
function findRemovedStringFromArray(
  before?: string[],
  after?: string[]
): string[] {
  const arr = [] as string[];
  if (!before) {
    return [];
  }
  if (!after) {
    return [...before];
  }
  before.forEach((str) => {
    if (!after.includes(str)) {
      arr.push(str);
    }
  });
  return arr;
}
function reduceToIncrementByInteger(arr: string[], number = 1) {
  return arr.reduce<any>((prev, curr) => {
    prev[curr] = admin.firestore.FieldValue.increment(number);
    return prev;
  }, {});
}
const firestore = admin.firestore();
export default function postTags(
  change: functions.Change<functions.firestore.DocumentSnapshot>
) {
  /** create, update */
  const tagArr = change.after.get("tags") as string[];
  const tagBeforeArr = change.before.get("tags") as string[];
  const updateData = {
    ...reduceToIncrementByInteger(
      findAddedStringFromArray(tagBeforeArr, tagArr),
      1
    ),
    ...reduceToIncrementByInteger(
      findRemovedStringFromArray(tagBeforeArr, tagArr),
      -1
    ),
  };
  return firestore
    .collection("$PARAMS$")
    .doc("tags")
    .set(updateData, { merge: true });
}
