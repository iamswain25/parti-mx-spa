import * as admin from "firebase-admin";
admin.initializeApp();
import authCreate from "./components/authCreate";
import authInvite from "./components/authInvite";
import authDelete from "./components/authDelete";
import closePostAtNight from "./components/closePostAtNight";
import SharePost from "./components/SharePost";
export { authCreate, authDelete, authInvite, closePostAtNight, SharePost };
