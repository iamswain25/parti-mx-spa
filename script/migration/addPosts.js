const array = [];
const { firestore, admin } = require("./firebase");
const batch = firestore.batch();
function addSuggestion({
  id,
  board_id,
  board,
  createdBy,
  updatedBy,
  images,
  files,
  location,
  users_aggregate,
  comments_aggregate,
  ...data
}) {
  data.created_by = createdBy.firebase_uid;
  data.updated_by = updatedBy.firebase_uid;
  data.group_id = `${board.group_id}`;
  data.board_id = `${board_id}`;
  data.type = board.type;
  if (data.created_at) data.created_at = new Date(data.created_at);
  if (data.updated_at) data.updated_at = new Date(data.updated_at);
  if (data.closed_at) {
    data.is_closed = true;
    data.closed_at = new Date(data.closed_at);
  } else {
    data.is_closed = false;
  }
  if (data.last_commented_at)
    data.last_commented_at = new Date(data.last_commented_at);
  const { closingMethod = "manual", address = null } = data.metadata;
  let latLng = null;
  if (location) {
    const {
      coordinates: [lng, lat],
    } = location;
    latLng = { lat, lng };
  }
  data.metadata = { closingMethod, location: { address, latLng } };
  data.count_like = users_aggregate.aggregate.sum.like_count;
  data.count_comment = comments_aggregate.aggregate.count;
  if (images)
    data.images =
      images.map(({ uri, ...data }) => {
        try {
          const path = uri
            .match(/o\/(posts%2F.+)\?alt=media/)[1]
            .replace(/%2F/g, "/");
          return { ...data, path };
        } catch (error) {
          console.log(error, uri);
          return null;
        }
      }) || null;
  if (files)
    data.files =
      files.map(({ uri, ...data }) => {
        try {
          const path = uri
            .match(/o\/(posts%2F.+)\?alt=media/)[1]
            .replace(/%2F/g, "/");
          return { ...data, path };
        } catch (error) {
          console.log(error, uri);
          return null;
        }
      }) || null;
  // return data;
  batch.set(firestore.collection("posts").doc(`${id}`), data);
}
function updateSuggestion({ id: post_id, location }) {
  const data = {
    metadata: {
      location: {
        latLng: admin.firestore.FieldValue.delete(),
      },
    },
  };
  if (location) {
    const {
      coordinates: [lng, lat],
    } = location;
    data.metadata.location.lat_lng = { lat, lng };
  }
  batch.set(firestore.collection("posts").doc(`${post_id}`), data, {
    merge: true,
  });
}
function addLikes({ id, users }) {
  users.map(({ updated_at, user }) => {
    const data = { created_at: new Date(updated_at) };
    batch.set(
      firestore
        .collection("posts")
        .doc(`${id}`)
        .collection("likes")
        .doc(user.firebase_uid),
      data,
      { merge: true },
    );
  });
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
array.map(updateSuggestion);
batch.commit().then(console.log);
