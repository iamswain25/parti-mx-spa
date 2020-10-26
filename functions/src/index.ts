import * as admin from "firebase-admin";
admin.initializeApp();
import authCreate from "./components/authCreate";
import authDelete from "./components/authDelete";
import incrementUserCount from "./components/incrementUserCount";
import postCreate from "./components/postCreate";
import postDelete from "./components/postDelete";
import commentCreate from "./components/commentCreate";
import commentCreate2 from "./components/commentCreate2";
import postLikeCreate from "./components/postLikeCreate";
import postLikeDelete from "./components/postLikeDelete";
import commentLikeCreate from "./components/commentLikeCreate";
import commentLikeCreate2 from "./components/commentLikeCreate2";
import commentLikeDelete from "./components/commentLikeDelete";
import commentLikeDelete2 from "./components/commentLikeDelete2";
export {
  authCreate,
  authDelete,
  incrementUserCount,
  postCreate,
  postDelete,
  postLikeCreate,
  postLikeDelete,
  commentCreate,
  commentLikeCreate,
  commentCreate2,
  commentLikeCreate2,
  commentLikeDelete,
  commentLikeDelete2,
};
