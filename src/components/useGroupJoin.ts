import { firestore } from "../config/firebase";
import {
  useCurrentUser,
  useGroupId,
  useLoginModal,
} from "../store/useGlobalState";
export default function useGroupJoin() {
  const [, setVisible] = useLoginModal();
  const [groupId] = useGroupId();
  const [currentUser] = useCurrentUser();
  async function handler() {
    if (currentUser) {
      return firestore
        .collection("groups")
        .doc(groupId)
        .collection("users")
        .doc(currentUser.uid)
        .set(
          {
            role: "user",
            photo_url: currentUser.photoURL,
            name: currentUser.displayName ?? currentUser.email,
            email: currentUser.email,
            created_at: new Date(),
            checked_at: new Date(),
          },
          { merge: true }
        );
    } else {
      setVisible(true);
    }
  }
  return handler;
}
