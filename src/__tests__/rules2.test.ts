import { setup, teardown } from "../config/testSetup";
import firebase from "@firebase/testing";
import { assertFails, assertSucceeds } from "@firebase/testing";

const mockUser = {
  uid: "auth-uid-swain",
};

const mockData = {
  "groups/home/boards/board1": {
    title: "hello",
    permission: {
      create: ["member", "organizer"],
      update: ["member", "organizer"],
      read: ["anonymous", "member", "organizer"],
      delete: ["member", "organizer"],
    },
  },
  "groups/home/boards/board2": {
    title: "hello",
    permission: {
      create: ["organizer"],
      update: ["anonymous", "member"],
      read: ["anonymous", "member", "organizer"],
      delete: ["anonymous", "member"],
    },
  },
  "groups/home/users/auth-uid-swain": {
    role: "anonymous",
  },
};

describe("anonymous user", () => {
  let db: firebase.firestore.Firestore;
  beforeAll(async () => {
    db = await setup(mockUser, mockData);
  });

  afterAll(teardown);

  test("success on edit", async () => {
    expect(
      db.doc("groups/home").set({ title: "haha" }, { merge: true })
    ).toDeny();
  });
  test("fail on post", async () => {
    const docRef = db
      .collection("posts")
      .add({ group_id: "home", board_id: "board1" });
    expect(docRef).toAllow();
    expect(
      db
        .doc("posts/uid-1")
        .set({ group_id: "home", board_id: "board1" }, { merge: true })
    ).toAllow();
    expect(
      db.doc("posts/uid-1").set({ title: "ok" }, { merge: true })
    ).toAllow();
    expect(db.doc("posts/uid-1").delete()).toAllow();
    // expect(docRef).toDeny();
  });
  test("success on post", async () => {
    const docRef = db
      .collection("posts")
      .add({ group_id: "home", board_id: "board2" });
    expect(docRef).toDeny();
    // expect(docRef).toAllow();
  });
});
