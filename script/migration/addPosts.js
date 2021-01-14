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
function addGroup({ id, createdBy, users_aggregate, ...data }) {
  data.created_at = new Date(data.created_at);
  data.created_by = createdBy.firebase_uid;
  data.bg_img = { path: data.bg_img_url };
  data.mb_img = { path: data.mb_img_url };
  data.count_user = users_aggregate.aggregate.count;
  batch.set(firestore.collection("groups").doc(`${id}`), data);
}
function addBoards({ id: groupId, boards }) {
  boards.map(
    ({
      id: boardId,
      permission,
      last_posted_at,
      count_open,
      count_closed,
      count_post,
      ...data
    }) => {
      data.last_posted_at = new Date(last_posted_at);
      data.permission = {
        comment: ["organizer", "member", "user"],
        create: ["organizer", "member", "user"],
        delete: ["organizer"],
        like: ["organizer", "member", "user"],
        read: ["organizer", "member", "user", "anonymous"],
        update: ["organizer"],
      };
      data.count_open = count_open.aggregate.count;
      data.count_closed = count_closed.aggregate.count;
      data.count_post = count_post.aggregate.count;
      batch.set(
        firestore
          .collection("groups")
          .doc(`${groupId}`)
          .collection("boards")
          .doc(`${boardId}`),
        data,
      );
    },
  );
}
array.map(addBoards2);
batch.commit().then(console.log);
