import firebase, { User } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
// import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";
import "firebase/storage";
import * as uuid from "uuid";
// 패키징 할 때만 넣는다.
type Modify<T, R> = Omit<T, keyof R> & R;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const Firebase = firebase;
export type IdTokenResult = Modify<
  firebase.auth.IdTokenResult,
  {
    claims: {
      "https://hasura.io/jwt/claims"?: {
        "x-hasura-allowed-roles": string[];
        "x-hasura-default-role": string;
        "x-hasura-user-id": string;
      };
    };
  }
>;

export async function getUserId(refresh = false): Promise<number | null> {
  const res:
    | IdTokenResult
    | undefined = await auth.currentUser?.getIdTokenResult(refresh);
  const string =
    res?.claims?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"];
  if (string === undefined) {
    return null;
  } else {
    return Number(string);
  }
}
export async function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}
export async function getUserId2(user: firebase.User): Promise<number | null> {
  let refreshCounts = 0;
  async function extractValidToken(refresh = false): Promise<number> {
    const res: IdTokenResult = await user.getIdTokenResult(refresh);
    const string =
      res?.claims?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"];
    if (string) {
      return Number(string);
    } else {
      if (refresh) {
        refreshCounts++;
        await delay(1000);
        console.log("token try: " + refreshCounts);
      }
      return extractValidToken(true);
    }
  }
  return extractValidToken();
}

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
  await getUserId2(newUserCredential.user);
  const token = await newUserCredential.user.getIdToken();
  return [token] as [string];
}
export const functions = firebase.app().functions("asia-northeast1");
