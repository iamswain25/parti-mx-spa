import firebase from "firebase/app";
import { sharentingFirebaseConfig as firebaseConfig } from "./firebaseConfig";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";
import "firebase/storage";
import * as uuid from "uuid";
// 패키징 할 때만 넣는다.
type Modify<T, R> = Omit<T, keyof R> & R;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
firestore.enablePersistence();

export async function uploadFileGetUriArray(file: File) {
  const { name, lastModified, type, size } = file;
  return new Promise(async function (res) {
    const path = `posts/${uuid.v4()}`;
    console.log({ path });
    const ref = firebase.storage().ref().child(path);
    const fileSnapshot = await ref.put(file);
    const uri = await fileSnapshot.ref.getDownloadURL();
    return res({ uri, name, lastModified, type, size });
  });
}

export async function uploadFileByPath(file: File, dir: string) {
  console.log({ dir });
  const ref = firebase.storage().ref().child(dir);
  const fileSnapshot = await ref.put(file);
  return await fileSnapshot.ref.getDownloadURL();
}
const secondApp = firebase.initializeApp(firebaseConfig, "new");
export const secondAuth = secondApp.auth();
export async function inviteNewUser(email: string, password: string) {
  const newUserCredential = await secondAuth.createUserWithEmailAndPassword(
    email,
    password
  );
  if (!newUserCredential.user) {
    throw new Error("no user created");
  }
  const token = await newUserCredential.user.getIdToken();
  return [token] as [string];
}
export const functions = firebase.app().functions("asia-northeast3");
