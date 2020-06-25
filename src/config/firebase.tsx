import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
// import "firebase/analytics";
import "firebase/auth";
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

export async function getUserId2(user: firebase.User): Promise<number | null> {
  const res = await user.getIdTokenResult();
  const string =
    res?.claims?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"];
  if (string === undefined) {
    return null;
  } else {
    return Number(string);
  }
}

export async function uploadFileGetUriArray(file: File) {
  return new Promise(async function (res) {
    const path = `posts/${uuid.v4()}`;
    console.log({ path });
    const ref = firebase.storage().ref().child(path);
    const fileSnapshot = await ref.put(file);
    const uri = fileSnapshot.ref.getDownloadURL();
    return res({ ...file, uri, type: "web" });
  });
}
