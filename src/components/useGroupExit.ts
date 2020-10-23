import useGroupId from "../store/useGroupId";
import { firestore } from "../config/firebase";
import useAuth from "../store/useAuth";
export default function useGroupExit(refetch?: any) {
  const [groupId] = useGroupId();
  const [user] = useAuth();
  async function handler() {
    if (window.confirm("그룹을 나가시겠습니까?")) {
      await firestore
        .collection("groups")
        .doc(groupId)
        .collection("users")
        .doc(user?.uid)
        .delete();
    }
  }
  return handler;
}
