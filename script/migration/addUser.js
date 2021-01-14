const array = [];

const { firestore } = require("./firebase");
const batch = firestore.batch();
function addUsers({ firebase_uid, ...data }) {
  if (data.created_at) data.created_at = new Date(data.created_at);
  if (data.deleted_at) data.deleted_at = new Date(data.deleted_at);
  batch.set(firestore.collection("users").doc(`${firebase_uid}`), data);
}
function addGroupUsers({ id: groupId, users }) {
  users.map(({ user: { firebase_uid }, status, ...data }) => {
    if (data.created_at) data.created_at = new Date(data.created_at);
    data.role = status;
    batch.set(
      firestore
        .collection("groups")
        .doc(`${groupId}`)
        .collection("users")
        .doc(firebase_uid),
      data,
    );
  });
}

array.map(addGroupUsers);

batch.commit().then(console.log);
