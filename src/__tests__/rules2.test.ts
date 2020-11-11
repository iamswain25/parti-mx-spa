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
      create: ["anonymous"],
    },
  },
  "groups/home/boards/board2": {
    title: "hello",
    permission: {
      create: ["organizer"],
    },
  },
  "groups/home/users/auth-uid-swain": {
    role: "organizer",
  },
};

describe("Database rules", () => {
  let db: firebase.firestore.Firestore;
  beforeAll(async () => {
    db = await setup(mockUser, mockData);
  });

  afterAll(teardown);

  test("success on edit", async () => {
    assertSucceeds(
      db.doc("groups/home").set({ title: "haha" }, { merge: true })
    );
  });
  test("fail on post", async () => {
    assertFails(
      db.collection("posts").add({ group_id: "home", board_id: "board1" })
    );
  });
  test("success on post", async () => {
    assertFails(
      db.collection("posts").add({ group_id: "home", board_id: "board2" })
    );
  });
});
