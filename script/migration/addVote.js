const array = [];

const { firestore } = require("./firebase");
const { batchArray, proxyBatchSet, commit } = require("./firestoreBatch");

function addVote({
  id: post_id,
  board_id,
  board,
  createdBy,
  updatedBy,
  images,
  files,
  location,
  users_aggregate,
  comments_aggregate,
  users,
  candidates,
  metadata: {
    isBinary,
    isMultiple,
    isAnonymous,
    closingMethod = "manual",
    isResultHidden,
  },
  comments,
  ...data
}) {
  data.deleted_at = null;
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
  data.count_like = users_aggregate.aggregate.sum.like_count;
  data.count_comment = comments_aggregate.aggregate.count;
  data.metadata = {
    isBinary:
      typeof isBinary === "boolean"
        ? isBinary
        : isBinary === "false"
        ? false
        : true,
    isMultiple:
      typeof isMultiple === "boolean"
        ? isMultiple
        : isMultiple === "false"
        ? false
        : true,
    isAnonymous:
      typeof isAnonymous === "boolean"
        ? isAnonymous
        : isAnonymous === "false"
        ? false
        : true,
    isResultHidden:
      typeof isResultHidden === "boolean"
        ? isResultHidden
        : isResultHidden === "false"
        ? false
        : true,
    closing_method: closingMethod,
  };

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
  proxyBatchSet(firestore.collection("posts").doc(`${post_id}`), data);
  users.map(({ updated_at, user }) => {
    const data = { created_at: new Date(updated_at) };
    proxyBatchSet(
      firestore
        .collection("posts")
        .doc(`${post_id}`)
        .collection("likes")
        .doc(user.firebase_uid),
      data,
      { merge: true },
    );
  });
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
  candidates.forEach(
    ({ id: candidate_id, created_by, votes, votes_aggregate, ...data }) => {
      data.created_at = new Date(data.created_at);
      data.created_by = created_by.firebase_uid;
      data.count_vote = votes_aggregate.aggregate.count;
      votes.forEach(({ created_at, user }) => {
        proxyBatchSet(
          firestore
            .collection("posts")
            .doc(`${post_id}`)
            .collection("candidates")
            .doc(`${candidate_id}`)
            .collection("users")
            .doc(`${user.firebase_uid}`),
          { created_at: new Date(created_at) },
        );
      });
      proxyBatchSet(
        firestore
          .collection("posts")
          .doc(`${post_id}`)
          .collection("candidates")
          .doc(`${candidate_id}`),
        data,
      );
    },
  );
}
array.map(addVote);
commit();
console.log(batchArray.length, batchArray.total);
// {
//   mx_posts_aggregate(where: {board: {type: {_eq: "vote"}}}) {
//     aggregate {
//       count
//     }
//   }
//   mx_comments_aggregate(where: {post: {board: {type: {_eq: "vote"}}}}) {
//     aggregate {
//       count
//     }
//   }
//   mx_users_post_aggregate(where: {post: {board: {type: {_eq: "vote"}}}}) {
//     aggregate {
//       sum {
//         like_count
//       }
//     }
//   }
//   mx_candidates_aggregate{
//     aggregate{
//       count
//     }
//   }
//   mx_posts(where: {
//     board: {type: {_eq: "vote"}}
//     # candidates: {votes: {count:{_gt :0}}}
//   }, 
//     # limit: 1
//   ) {
//     id
//     candidates{
//       body
//       id
//       created_at
//       order
//       created_by: user{
//         firebase_uid
//       }
//       votes{
//         created_at
//         user{
//           firebase_uid
//         }
//       }
//       votes_aggregate{
//         aggregate{
//           count
//         }
//       }
//     }
//     users(where: {like_count: {_gt: 0}}) {
//       updated_at
//       user {
//         firebase_uid
//       }
//     }
//     comments(where: {parent_id: {_is_null: true}}) {
//       id
//       body
//       created_at
//       updated_at
//       user {
//         firebase_uid
//       }
//       re_aggregate {
//         aggregate {
//           count
//         }
//       }
//       re {
//         id
//         body
//         created_at
//         updated_at
//         user {
//           firebase_uid
//         }
//       }
//     }
//     comments_aggregate {
//       aggregate {
//         count
//       }
//     }
//     users_aggregate {
//       aggregate {
//         sum {
//           like_count
//         }
//       }
//     }
//     board_id
//     board {
//       type
//       group_id
//     }
//     location
//     metadata
//     title
//     html
//     images
//     files
//     body
//     context
//     created_at
//     updated_at
//     closed_at
//     last_commented_at
//     conclusion
//     createdBy {
//       firebase_uid
//     }
//     updatedBy {
//       firebase_uid
//     }
//   }
// }
