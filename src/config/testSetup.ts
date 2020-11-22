import * as firebase from "@firebase/testing";
import fs from "fs";
import { policyFair } from "./firebaseConfig";
export const setup = async (auth: any, data: any) => {
  const { projectId } = policyFair;
  // console.log(projectId, __dirname);
  const app = firebase.initializeTestApp({
    projectId,
    auth,
  });
  // Apply rules
  const res1 = await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync(__dirname + "/../../firestore.test.rules", "utf8"),
  });
  // console.log(res1);
  const db = app.firestore();
  // Write mock documents before rules

  if (data) {
    for (const key in data) {
      const ref = db.doc(key);
      await ref.set(data[key]);
    }
  }

  // Apply rules
  const res2 = await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync(__dirname + "/../../firestore.rules", "utf8"),
  });
  // console.log(res2);
  return db;
};

export const teardown = async () => {
  Promise.all(firebase.apps().map((app) => app.delete()));
};

expect.extend({
  async toAllow(x) {
    let pass = false;
    try {
      await firebase.assertSucceeds(x);
      pass = true;
    } catch (err) {}

    return {
      pass,
      message: () =>
        "Expected Firebase operation to be allowed, but it was denied",
    };
  },
});

expect.extend({
  async toDeny(x) {
    let pass = false;
    try {
      await firebase.assertFails(x);
      pass = true;
    } catch (err) {}
    return {
      pass,
      message: () =>
        "Expected Firebase operation to be denied, but it was allowed",
    };
  },
});
