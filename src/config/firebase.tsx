import firebase from "firebase/app";
import { greenNewDeal as firebaseConfig } from "./firebaseConfig";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";
import "firebase/storage";
import * as uuid from "uuid";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
// firestore.enablePersistence({ synchronizeTabs: true });

export async function uploadFileByUUID(file: File) {
  const { name, lastModified, type, size } = file;
  const path = `posts/${uuid.v4()}`;
  console.log({ path });
  const ref = firebase.storage().ref().child(path);
  await ref.put(file);
  return { path, name, lastModified, type, size };
}

export async function uploadFileByPath(file: File, path: string) {
  const { name, lastModified, type, size } = file;
  console.log({ path });
  const ref = firebase.storage().ref().child(path);
  await ref.put(file);
  return { name, lastModified, type, size, path };
}
const secondApp = firebase.initializeApp(firebaseConfig, "new");
export const secondAuth = secondApp.auth();
export async function inviteNewUser(email: string, password: string) {
  const newUserCredential = await secondAuth.createUserWithEmailAndPassword(
    email,
    password,
  );
  if (!newUserCredential.user) {
    throw new Error("no user created");
  }
  const token = await newUserCredential.user.getIdToken();
  return [token] as [string];
}
export const functions = firebase.app().functions("asia-northeast3");
