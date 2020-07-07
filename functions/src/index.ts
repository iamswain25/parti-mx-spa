import * as admin from "firebase-admin";
admin.initializeApp();
import authCreate from "./components/authCreate";
import authDelete from "./components/authDelete";
export { authCreate, authDelete };
