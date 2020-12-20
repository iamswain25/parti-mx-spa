const array = [];
const { firestore } = require("./firebase");
const batch = firestore.batch();
function addSuggestion({ id, ...data }) {
  data.created_by = "Gmh0xAICMeYpcJpgLWPjYHn6bSd2";
  data.updated_by = "Gmh0xAICMeYpcJpgLWPjYHn6bSd2";
  data.group_id = "home";
  data.board_id = "ubxgpbnMzgOVKodUmypK";
  data.type = "suggestion";
  const { closingMethod, address } = data.metadata;
  data.metadata = { closingMethod, location: { address } };
  batch.set(firestore.collection("posts").doc(`${id}`), data);
}
function addEvent({ id, ...data }) {
  data.created_by = "Gmh0xAICMeYpcJpgLWPjYHn6bSd2";
  data.updated_by = "Gmh0xAICMeYpcJpgLWPjYHn6bSd2";
  data.group_id = "home";
  data.board_id = "K9eHvLcnVOMAz5rCqMPY";
  data.type = "event";
  delete data.context;
  batch.set(firestore.collection("posts").doc(`${id}`), data);
}
function addComment({ id: post_id, comments }) {
  comments.forEach(({ id: comment_id, created_at, user, body }) => {
    const data = {
      body,
      created_at: new Date(created_at),
      created_by: user,
      post_id: `${post_id}`,
    };
    batch.set(
      firestore
        .collection("posts")
        .doc(`${post_id}`)
        .collection("comments")
        .doc(`${comment_id}`),
      data,
    );
  });
}
function updateManualClosing({ id, ...data }) {
  data.metadata = { ...data.metadata, closingMethod: "manual" };
  batch.update(firestore.collection("posts").doc(`${id}`), data);
}
function updateTime({ id, ...data }) {
  data.updated_at = new Date(data.updated_at);
  data.created_at = new Date(data.created_at);
  batch.update(firestore.collection("posts").doc(`${id}`), data);
}
function updateFilePath({ id, images, files, metadata }) {
  metadata.event_date = new Date(metadata.eventDate);
  metadata.deadline = new Date(metadata.deadline);
  delete metadata.eventDate;
  const data = { metadata };
  if (images)
    data.images =
      images.map(({ uri, ...data }) => ({ ...data, path: uri })) || null;
  if (files)
    data.files =
      files.map(({ uri, ...data }) => ({ ...data, path: uri })) || null;
  if (Object.keys(data).length)
    batch.update(firestore.collection("posts").doc(`${id}`), data);
}
function addNotice({ id, ...data }) {
  data.created_by = "Gmh0xAICMeYpcJpgLWPjYHn6bSd2";
  data.updated_by = "Gmh0xAICMeYpcJpgLWPjYHn6bSd2";
  data.deleted_at = null;
  data.group_id = "home";
  data.is_announced = false;
  data.board_id = "y9vr1byRjAefig7BB0t8";
  data.type = "notice";
  batch.set(firestore.collection("posts").doc(`${id}`), data);
}
array.map(addComment);
batch.commit().then(console.log);
