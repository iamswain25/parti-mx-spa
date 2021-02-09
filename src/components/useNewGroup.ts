import { useHistory } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useCurrentUser } from "../store/useGlobalState";

export default function useNewGroup() {
  const history = useHistory();
  const [user] = useCurrentUser();
  async function handler() {
    const slug = window.prompt("enter slug");
    if (!slug) return;
    const title = window.prompt("enter title");
    if (!title) return;
    const exist = (await firestore.collection("groups").doc(slug).get()).exists;
    if (exist) {
      return window.alert("이미 존재하는 그룹입니다.");
    }
    const createGroup = async () =>
      firestore
        .collection("groups")
        .doc(slug)
        .set({ title, created_at: new Date(), created_by: user?.uid });
    const addAdmin = async () =>
      firestore
        .collection("groups")
        .doc(slug)
        .collection("users")
        .doc(user?.uid)
        .set({ role: "organizer", created_at: new Date() });
    const showAlert = () => window.alert("새 그룹을 만들었습니다.");
    const redirect = () => history.push(`/${slug}/edit`);
    await createGroup()
      .then(addAdmin)
      .then(showAlert)
      .then(redirect)
      .catch(alert);
  }
  return handler;
}
