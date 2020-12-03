import { useHistory } from "react-router-dom";
// import firebase from "firebase";
// import { useCurrentUser } from "../store/useGlobalState";
// import { firestore } from "../config/firebase";
export default function useNavigateToPost(post_id?: string) {
  const { push } = useHistory();
  // const [currentUser] = useCurrentUser();
  function navigateHandler() {
    // if (currentUser) {
    //   const userId = currentUser.uid;
    //   firestore
    //     .collection("posts")
    //     .doc(post_id)
    //     .collection("users")
    //     .doc(userId)
    //     .set(
    //       { count_click: firebase.firestore.FieldValue.increment(1) },
    //       { merge: true }
    //     );
    // }
    push("/post/" + post_id);
  }

  return navigateHandler;
}
