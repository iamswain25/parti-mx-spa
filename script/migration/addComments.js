const array = [];
const { firestore } = require("./firebase");
const batchArray = [];
let proxyBatchSet;
let counter = 0;
const handler = {
  apply: function (target, thisArg, argumentsList) {
    counter++;
    target.apply(thisArg, argumentsList);
    if (counter >= 500) {
      counter = 0;
      generateNewBatch();
    }
  },
};
function generateNewBatch() {
  const batch = firestore.batch();
  batchArray.push(batch);
  const batchSet = batch.set.bind(batch);
  proxyBatchSet = new Proxy(batchSet, handler);
}
generateNewBatch();

function addComment({ id: post_id, comments }) {
  comments.forEach(
    ({
      id: comment_id,
      created_at,
      updated_at,
      user,
      parent_id,
      re_aggregate,
      re,
      ...data
    }) => {
      re.forEach(
        ({ id: re_id, created_at, updated_at, user, parent_id, ...data }) => {
          data.parent_id = `${comment_id}`;
          data.created_at = new Date(created_at);
          data.updated_at = new Date(updated_at);
          data.created_by = user.firebase_uid;
          data.post_id = `${post_id}`;
          proxyBatchSet(
            firestore
              .collection("posts")
              .doc(`${post_id}`)
              .collection("comments")
              .doc(`${comment_id}`)
              .collection("comments")
              .doc(`${re_id}`),
            data,
          );
        },
      );
      data.created_at = new Date(created_at);
      data.updated_at = new Date(updated_at);
      data.created_by = user.firebase_uid;
      data.post_id = `${post_id}`;
      data.parent_id = null;
      data.count_comment = re_aggregate.aggregate.count;
      proxyBatchSet(
        firestore
          .collection("posts")
          .doc(`${post_id}`)
          .collection("comments")
          .doc(`${comment_id}`),
        data,
      );
    },
  );
}
function updateSuggestion(a) {
  proxyBatchSet(firestore.collection("posts").doc("1"), { a });
}
array.map(addComment);
Promise.all(batchArray.map(batch => batch.commit())).then(console.log);
console.log(batchArray.length, counter);
