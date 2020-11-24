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
    if (currentUser?.email) {
      return firestore
        .collection("groups")
        .doc(groupId)
        .collection("users")
        .doc(currentUser.uid)
        .set(
          {
            role: "user",
            created_at: new Date(),
          },
          { merge: true }
        );
    } else {
      setVisible(true);
    }
  }
  return handler;
}
