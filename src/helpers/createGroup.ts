import { firestore } from "../config/firebase";

export default function createGroup(group_id: string) {
  const title = window.prompt("그룹명을 입력해 주세요");
  if (title) {
    firestore
      .collection("groups")
      .doc(group_id)
      .set({ created_at: new Date(), title })
      .catch(window.alert);
  }
}
