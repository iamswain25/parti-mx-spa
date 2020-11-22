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
      create: ["user"],
      update: ["user"],
      read: ["user"],
      delete: ["user"],
    },
  },
  "groups/home/users/auth-uid-swain": {
    role: "organizer",
  },
};

describe("organizer user", () => {
  let db: firebase.firestore.Firestore;
  beforeAll(async () => {
    db = await setup(mockUser, mockData);
  });

  afterAll(teardown);

  test("group edit", async () => {
    expect(
      db.doc("groups/home").set({ title: "haha" }, { merge: true })
    ).toAllow();
  });
  test("board 1", async () => {
    expect(
      db.collection("posts").add({ group_id: "home", board_id: "board1" })
    ).toAllow();
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
  test("board 2", async () => {
    expect(
      db.collection("posts").add({ group_id: "home", board_id: "board2" })
    ).toDeny();
    expect(
      db
        .doc("posts/uid-2")
        .set({ group_id: "home", board_id: "board2" }, { merge: true })
    ).toDeny();
    expect(
      db.doc("posts/uid-2").set({ title: "ok" }, { merge: true })
    ).toDeny();
    expect(db.doc("posts/uid-2").delete()).toDeny();
  });
});
