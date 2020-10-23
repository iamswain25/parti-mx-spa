import * as admin from "firebase-admin";
admin.initializeApp();
import authCreate from "./components/authCreate";
import authDelete from "./components/authDelete";
import incrementUserCount from "./components/incrementUserCount";
export { authCreate, authDelete, incrementUserCount };
