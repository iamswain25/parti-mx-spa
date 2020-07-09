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
  async function delay(t: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, t);
    });
  }
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
        await delay(500);
        console.log("token try: " + refreshCounts);
      }
      return extractValidToken(true);
    }
  }
  return extractValidToken();
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