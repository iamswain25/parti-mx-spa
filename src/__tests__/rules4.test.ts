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
      read: ["anonymous", "member", "organizer", "user"],
      delete: ["member", "organizer"],
    },
  },
  "groups/home/boards/board2": {
    title: "hello",
    permission: {
      create: ["member", "organizer", "user"],
      update: ["member", "organizer"],
      read: ["anonymous", "member", "organizer", "user"],
      delete: ["member", "organizer"],
    },
  },
  "groups/home/users/auth-uid-swain": {
    role: "user",
  },
  "posts/test1": {
    group_id: "home",
    board_id: "board1",
    title: "ok",
    created_at: new Date(),
  },
};

describe("just user", () => {
  let db: firebase.firestore.Firestore;
  beforeAll(async () => {
    db = await setup(mockUser, mockData);
  });

  afterAll(teardown);

  test("board 1", async () => {
    expect(
      db.collection("posts").orderBy("created_by", "desc").get()
    ).toAllow();
    expect(db.doc("posts/test1").get()).toAllow();
    expect(
      db.doc("posts/test1").set({ title: "ok" }, { merge: true })
    ).toDeny();
    expect(db.doc("posts/test1").delete()).toDeny();
    expect(
      db
        .doc("posts/test2")
        .set({ group_id: "home", board_id: "board1" }, { merge: true })
    ).toDeny();
    expect(
      db
        .doc("posts/test2")
        .set({ group_id: "home", board_id: "board2" }, { merge: true })
    ).toAllow();
  });
});
