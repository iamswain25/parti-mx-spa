import * as admin from "firebase-admin";
admin.initializeApp();
import authCreate from "./components/authCreate";
import authDelete from "./components/authDelete";
import incrementUserCount from "./components/incrementUserCount";
import postCreate from "./components/postCreate";
export { authCreate, authDelete, incrementUserCount, postCreate };
