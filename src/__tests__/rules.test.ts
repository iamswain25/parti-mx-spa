import { setup, teardown } from "../config/testSetup";
import firebase from "@firebase/testing";
import { assertFails, assertSucceeds } from "@firebase/testing";

const mockUser = {
  uid: "auth-uid-swain",
};

const mockData = {
  "groups/home": {
    title: "hello",
  },
};

describe("Database rules", () => {
  let db: firebase.firestore.Firestore;
  let ref: firebase.firestore.CollectionReference;

  beforeAll(async () => {
    db = await setup(mockUser, mockData);
    ref = db.collection("some-nonexistent-collection");
  });

  afterAll(teardown);

  test("successful init", async () => {
    expect(db).not.toBe(undefined);
  });

  test("fail when reading/writing an unauthorized collection", async () => {
    // One-line await
    expect(ref.add({})).toDeny();
    expect(ref.get()).toDeny();
  });

  test("success on get", async () => {
    assertSucceeds(db.doc("groups/home").get());
  });
  test("fail on edit", async () => {
    assertFails(db.doc("groups/home").update({ title: "haha" }));
  });
});
