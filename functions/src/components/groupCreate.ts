import * as functions from "firebase-functions";
const member = ["organizer", "member"];
const user = ["organizer", "member", "user"];
const permission = {
  comment: user,
  create: member,
  delete: ["organizer"],
  like: user,
  read: ["organizer", "member", "user", "anonymous"],
  update: ["organizer"],
};
export default functions
  .region("asia-northeast3")
  .firestore.document("groups/{group_id}")
  .onCreate(async snapshot => {
    const boardsCollection = snapshot.ref.collection("boards");
    await boardsCollection.add({
      type: "notice",
      title: "공지",
      body: "공지",
      order: 1,
      permission,
    });
    await boardsCollection.add({
      type: "suggestion",
      title: "제안",
      body: "제안",
      order: 2,
      permission: { ...permission, create: user },
    });
    await boardsCollection.add({
      type: "vote",
      title: "투표",
      body: "투표",
      order: 3,
      permission,
    });
    await boardsCollection.add({
      type: "event",
      title: "모임",
      body: "모임",
      order: 4,
      permission,
    });
    return;
  });
