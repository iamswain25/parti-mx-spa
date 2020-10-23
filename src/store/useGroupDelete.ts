import { firestore } from "../config/firebase";
import { useGroupId } from "./useGlobalState";

export default function useGroupDelete() {
  const [groupId] = useGroupId();
  async function handler() {
    if (window.confirm("그룹을 지우시겠습니까? 복구할 수 없습니다.")) {
      await firestore.collection("groups").doc(groupId).delete();
    }
  }
  return handler;
}
