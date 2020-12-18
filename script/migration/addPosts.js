const array = [];

// array.map(item => console.log(item.title));
const { firestore } = require("./firebase");
const batch = firestore.batch();
function addBatch({ id, ...data }) {
  // data.updated_at = new Date(data.updated_at);
  // data.created_at = new Date(data.created_at);
  // data.created_by = "Gmh0xAICMeYpcJpgLWPjYHn6bSd2";
  // data.updated_by = "Gmh0xAICMeYpcJpgLWPjYHn6bSd2";
  // data.deleted_at = null;
  // data.group_id = "home";
  // data.count_comment = 0;
  // data.count_like = 0;
  // data.is_closed = false;
  // data.is_announced = false;
  // data.last_commented_at = null;
  // data.last_liked_at = null;
  // data.board_id = "y9vr1byRjAefig7BB0t8";
  // data.type = "notice";
  // console.log(id, data);
  batch.update(firestore.collection("posts").doc(`${id}`), data);
}
array.map(addBatch);
batch.commit().then(console.log);
