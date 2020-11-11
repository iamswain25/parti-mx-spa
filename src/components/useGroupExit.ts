import { useGroupId } from "../store/useGlobalState";
import { firestore } from "../config/firebase";
import { useCurrentUser } from "../store/useGlobalState";
export default function useGroupExit(cb?: Function) {
  const [groupId] = useGroupId();
  const [currentUser] = useCurrentUser();
  async function handler() {
    if (window.confirm("그룹을 나가시겠습니까?")) {
      await firestore
        .collection("groups")
        .doc(groupId)
        .collection("users")
        .doc(currentUser?.uid)
        .delete();
      cb && cb();
    }
  }
  return handler;
}
