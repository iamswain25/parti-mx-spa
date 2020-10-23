import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";

import { useCurrentUser } from "../store/useGlobalState";

export default function useNavigateToPost(post_id?: string) {
  const { push } = useHistory();
  const [currentUser] = useCurrentUser();
  function navigateHandler() {
    if (currentUser) {
      const userId = currentUser.uid;
      firestore
        .collection("posts")
        .doc(post_id)
        .collection("users")
        .doc(userId)
        .set(
          { view_count: firebase.firestore.FieldValue.increment(1) },
          { merge: true }
        );
    }
    push("/post/" + post_id);
  }

  return navigateHandler;
}
