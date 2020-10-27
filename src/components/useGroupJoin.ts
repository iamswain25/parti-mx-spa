import useMe from "../store/useMe";
import { firestore } from "../config/firebase";
import { useGroupId, useLoginModal } from "../store/useGlobalState";
export default function useGroupJoin() {
  const [, setVisible] = useLoginModal();
  const [groupId] = useGroupId();
  const [me] = useMe();
  async function handler() {
    if (me) {
      firestore
        .collection("groups")
        .doc(groupId)
        .collection("users")
        .doc(me.id)
        .set(
          { ...me, created_at: new Date(), checked_at: new Date() },
          { merge: true }
        );
    } else {
      setVisible(true);
    }
  }
  return handler;
}
